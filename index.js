var MAX_XY = 3;
var MIN_XY = 0;
var TOTAL_TILES = 15;
;
var loading = document.getElementById('loading');
var container = document.getElementById('container');
var showLoading = function () {
    loading.classList.remove('hide');
    container.classList.add('hide');
};
var hideLoading = function () {
    loading.classList.add('hide');
    container.classList.remove('hide');
};
var getEmptyTile = function () {
    return document.querySelectorAll('[data-value="empty"]')[0];
};
var getXYOf = function (e, key) { return e.getAttribute("data-".concat(key)); };
var updateTiles = function (movingTileX, movingTileY) {
    var newEmptyTile = getFullElementFromCoordinates({
        x: parseInt(movingTileX),
        y: parseInt(movingTileY)
    });
    var currentEmptyTile = getEmptyTile();
    currentEmptyTile.setAttribute('data-value', newEmptyTile.tileValue);
    currentEmptyTile.innerHTML = newEmptyTile.tileValue;
    newEmptyTile.element.setAttribute('data-value', 'empty');
    newEmptyTile.element.innerHTML = ''; // empty
};
var swapTilesOf = function (nextKey) {
    var around = getElementsAroundEmptyTile();
    var nextKeyCoordinates = around[nextKey];
    if (exists(nextKeyCoordinates)) {
        return updateTiles(nextKeyCoordinates.x, nextKeyCoordinates.y);
    }
    console.log('invalid move', nextKeyCoordinates);
};
var KeyHandler = {
    ArrowLeft: function () { return swapTilesOf("nextRightPosition" /* Keys.RIGHT */); },
    ArrowRight: function () { return swapTilesOf("nextLeftPosition" /* Keys.LEFT */); },
    ArrowUp: function () { return swapTilesOf("nextDownPosition" /* Keys.DOWN */); },
    ArrowDown: function () { return swapTilesOf("nextUpPosition" /* Keys.UP */); }
};
document.querySelector("body").addEventListener("keydown", function (e) {
    var pressedKey = e.key;
    if (KeyHandler.hasOwnProperty(pressedKey)) {
        KeyHandler[pressedKey](pressedKey);
    }
});
var getElementsAroundEmptyTile = function () {
    var emptyTile = getEmptyTile();
    var x = parseInt(getXYOf(emptyTile, 'x'));
    var y = parseInt(getXYOf(emptyTile, 'y'));
    var position = { x: x, y: y };
    var nextLeftPosition = getNextLeft(position);
    var nextRightPosition = getNextRight(position);
    var nextUpPosition = getNextUp(position);
    var nextDownPosition = getNextDown(position);
    return {
        nextLeftPosition: nextLeftPosition,
        nextRightPosition: nextRightPosition,
        nextUpPosition: nextUpPosition,
        nextDownPosition: nextDownPosition
    };
};
var getFullElementFromCoordinates = function (_a) {
    var x = _a.x, y = _a.y;
    var element = document
        .querySelector("[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
    return {
        element: element,
        tileValue: element.getAttribute('data-value')
    };
};
var exists = function (_a) {
    var x = _a.x, y = _a.y;
    return (x <= MAX_XY
        && y <= MAX_XY
        && x >= MIN_XY
        && y >= MIN_XY);
};
var getNextLeft = function (_a) {
    var x = _a.x, y = _a.y;
    return ({
        x: x - 1,
        y: y
    });
};
var getNextRight = function (_a) {
    var x = _a.x, y = _a.y;
    return ({
        x: x + 1,
        y: y
    });
};
var getNextUp = function (_a) {
    var x = _a.x, y = _a.y;
    return ({
        x: x,
        y: y - 1
    });
};
var getNextDown = function (_a) {
    var x = _a.x, y = _a.y;
    return ({
        x: x,
        y: y + 1
    });
};
var generateRandomTable = function () {
    var table = [];
    while (table.length < TOTAL_TILES) {
        var generated = Math.floor(Math.random() * TOTAL_TILES) + 1;
        if (table.indexOf(generated) === -1) {
            table.push(generated);
        }
    }
    return table;
};
var resetTable = function () {
    var table = generateRandomTable();
    var valueIndex = 0;
    for (var x = 0; x <= 3; x++) {
        for (var y = 0; y <= 3; y++) {
            var tile = getFullElementFromCoordinates({ x: x, y: y });
            tile.element.setAttribute('data-value', "".concat(table[valueIndex]));
            tile.element.innerHTML = "".concat(table[valueIndex]);
            valueIndex++;
        }
    }
    var emptyTile = getFullElementFromCoordinates({ x: 3, y: 3 });
    emptyTile.element.setAttribute('data-value', 'empty');
    emptyTile.element.innerHTML = '';
    setTimeout(function () {
        hideLoading();
    }, 2000);
};
resetTable();
