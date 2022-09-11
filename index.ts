const MAX_XY = 3;
const MIN_XY = 0;
const TOTAL_TILES = 15;

const enum Keys {
    LEFT = 'nextLeftPosition',
    RIGHT = 'nextRightPosition',
    UP = 'nextUpPosition',
    DOWN = 'nextDownPosition',
};

type TileValue = string | number;

type FullElement = {
    element: Element,
    tileValue: string
}

type Position = {
    x: number
    y: number
};

const loading = document.getElementById('loading');
const container = document.getElementById('container');

const showLoading = () => {
    loading!.classList.remove('hide');
    container!.classList.add('hide');
}

const hideLoading = () => {
    loading!.classList.add('hide');
    container!.classList.remove('hide');
}

const getEmptyTile = (): Element =>
    document.querySelectorAll('[data-value="empty"]')[0];

const getXYOf = (e: Element, key: 'x' | 'y') => e.getAttribute(`data-${key}`)!;

const updateTiles = (movingTileX: TileValue, movingTileY: TileValue) => {

    const newEmptyTile = getFullElementFromCoordinates({
        x: parseInt(movingTileX as string),
        y: parseInt(movingTileY as string)
    });

    const currentEmptyTile = getEmptyTile();

    currentEmptyTile.setAttribute('data-value', newEmptyTile.tileValue as string);
    currentEmptyTile.innerHTML = newEmptyTile.tileValue as string;

    newEmptyTile.element.setAttribute('data-value', 'empty');
    newEmptyTile.element.innerHTML = ''; // empty
}

const swapTilesOf = (nextKey: Keys) => {
    const around = getElementsAroundEmptyTile();

    const nextKeyCoordinates = around[nextKey];

    if (exists(nextKeyCoordinates)) {
        return updateTiles(nextKeyCoordinates.x, nextKeyCoordinates.y)
    }

    console.log('invalid move', nextKeyCoordinates)
}

const KeyHandler = {
    ArrowLeft: () => swapTilesOf(Keys.RIGHT),
    ArrowRight: () => swapTilesOf(Keys.LEFT),
    ArrowUp: () => swapTilesOf(Keys.DOWN),
    ArrowDown: () => swapTilesOf(Keys.UP),
};

document.querySelector("body")!.addEventListener("keydown", e => {
    const pressedKey = e.key;

    if (KeyHandler.hasOwnProperty(pressedKey)) {
        KeyHandler[pressedKey](pressedKey);
    }
});

const getElementsAroundEmptyTile = (): { [key: string]: Position } => {
    const emptyTile = getEmptyTile();

    const x = parseInt(getXYOf(emptyTile, 'x'));
    const y = parseInt(getXYOf(emptyTile, 'y'));

    const position = { x, y };

    const nextLeftPosition = getNextLeft(position);
    const nextRightPosition = getNextRight(position);
    const nextUpPosition = getNextUp(position);
    const nextDownPosition = getNextDown(position);

    return {
        nextLeftPosition,
        nextRightPosition,
        nextUpPosition,
        nextDownPosition,
    }
}

const getFullElementFromCoordinates = ({ x, y }: Position): FullElement => {
    const element = document
        .querySelector(`[data-x="${x}"][data-y="${y}"]`) as Element;

    return {
        element,
        tileValue: element.getAttribute('data-value')!
    }
}

const exists = ({ x, y }: Position) => (
    x <= MAX_XY
    && y <= MAX_XY
    && x >= MIN_XY
    && y >= MIN_XY
);

const getNextLeft = ({ x, y }: Position) => ({
    x: x - 1,
    y
});

const getNextRight = ({ x, y }: Position) => ({
    x: x + 1,
    y
});

const getNextUp = ({ x, y }: Position) => ({
    x,
    y: y - 1
});

const getNextDown = ({ x, y }: Position) => ({
    x,
    y: y + 1
});

const generateRandomTable = () => {
    const table: Array<number> = [];

    while (table.length < TOTAL_TILES) {
        const generated = Math.floor(Math.random() * TOTAL_TILES) + 1;

        if (table.indexOf(generated) === -1) {
            table.push(generated);
        }
    }

    return table;
}

const resetTable = () => {
    const table = generateRandomTable();
    let valueIndex = 0;

    for (let x = 0; x <= 3; x++) {
        for (let y = 0; y <= 3; y++) {
            const tile = getFullElementFromCoordinates({ x, y });
            tile.element.setAttribute('data-value', `${table[valueIndex]}`);
            tile.element.innerHTML = `${table[valueIndex]}`;
            valueIndex++;
        }
    }

    const emptyTile = getFullElementFromCoordinates({ x: 3, y: 3 });
    emptyTile.element.setAttribute('data-value', 'empty');
    emptyTile.element.innerHTML = '';

    setTimeout(() => {
        hideLoading();
    }, 2000);
}

resetTable()