const MAX_XY = 3;

const getEmptyTile = () =>
    document.querySelectorAll('[data-value=""]')[0];

const getXOf = (e) => e.getAttribute('data-x');
const getYOf = (e) => e.getAttribute('data-y');

const Keys = {
    LEFT: 'nextLeftPosition',
    RIGHT: 'nextRightPosition',
    ABOVE: 'nextAbovePosition',
    BELLOW: 'nextBellowPosition',
};

let EMPTY_TILE_CURRENT_VALUE = {}

const emptyTileStore = {
    set: (x, y) => EMPTY_TILE_CURRENT_VALUE = { x, y },
    get: () => EMPTY_TILE_CURRENT_VALUE
}

const getElementByCoordinates = (x, y) =>
    document.querySelectorAll(`[data-x=${x}data-y=${y}]`)

const exists = ({ x, y }) => !(x > MAX_XY || y > MAX_XY);

const getNextLeft = (x, y) => ({
    x,
    y: y - 1
});

const getNextRight = (x, y) => ({
    x,
    y: y + 1
});

const getNextAbove = (x, y) => ({
    x: x - 1,
    y
});

const getNextBellow = (x, y) => ({
    x: x + 1,
    y
});

const updateTiles = (oldTileX, oldTileY, oldTileValue, newEmptyX, newEmptyY, newEmptyValue) => {
    const oldTileEmpty = getEmptyTile();

    oldTileEmpty.setAttribute('data-x', newEmptyX);
    oldTileEmpty.setAttribute('data-y', newEmptyY);
    oldTileEmpty.innerHTML = newEmptyValue;

    const oldTile = getElementByCoordinates(oldTileX, oldTileY)
    emptyTile.setAttribute('data-x', newEmptyX);
    emptyTile.setAttribute('data-y', newEmptyY);
    oldTile.innerHTML = 'empty';

}

const getElementsAroundEmptyTile = () => {
    const empty = getEmptyTile();

    const x = parseInt(getXOf(empty));
    const y = parseInt(getYOf(empty));

    emptyTileStore.set(x, y)

    const nextLeftPosition = getNextLeft(x, y)
    const nextRightPosition = getNextRight(x, y)
    const nextAbovePosition = getNextAbove(x, y)
    const nextBellowPosition = getNextBellow(x, y)

    return {
        nextLeftPosition,
        nextRightPosition,
        nextAbovePosition,
        nextBellowPosition,
    }
}

const swap = (nextKey) => {
    const around = getElementsAroundEmptyTile();
    console.table(around)

    const nextKeyCoordinates = around[nextKey]

    if (nextKeyCoordinates) {

    }

    getElementByCoordinates(nX, nY);
    emptyTileStore.set(nX, nY)
}

const KeyHandler = {
    ArrowLeft: () => swap(Keys.LEFT),
    ArrowRight: () => swap(Keys.RIGHT),
    ArrowUp: () => swap(Keys.UP),
    ArrowDown: () => swap(Keys.UP),
};

const body = document.querySelector("body");

body.addEventListener("keydown", e => {
    const pressedKey = e.key;

    if (KeyHandler.hasOwnProperty(pressedKey)) {
        KeyHandler[pressedKey](pressedKey);
    }
});

const repaintFn = () => {
    requestAnimationFrame(repaintFn);
};

requestAnimationFrame(repaintFn);