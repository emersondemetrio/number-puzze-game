var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("constants", [], function (exports_1, context_1) {
    "use strict";
    var MAX_XY, MIN_XY, TOTAL_TILES;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("MAX_XY", MAX_XY = 3);
            exports_1("MIN_XY", MIN_XY = 0);
            exports_1("TOTAL_TILES", TOTAL_TILES = 15);
        }
    };
});
System.register("types", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("utils", ["constants"], function (exports_3, context_3) {
    "use strict";
    var constants_1, generateRandomTable, exists, getNextLeft, getNextRight, getNextUp, getNextDown, getXYOf, updateAttribute, getAttribute;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            exports_3("generateRandomTable", generateRandomTable = () => {
                const table = [];
                while (table.length < constants_1.TOTAL_TILES) {
                    const generated = Math.floor(Math.random() * constants_1.TOTAL_TILES) + 1;
                    if (table.indexOf(generated) === -1) {
                        table.push(generated);
                    }
                }
                return table;
            });
            exports_3("exists", exists = ({ x, y }) => x <= constants_1.MAX_XY && y <= constants_1.MAX_XY && x >= constants_1.MIN_XY && y >= constants_1.MIN_XY);
            exports_3("getNextLeft", getNextLeft = ({ x, y }) => ({
                x: x - 1,
                y,
            }));
            exports_3("getNextRight", getNextRight = ({ x, y }) => ({
                x: x + 1,
                y,
            }));
            exports_3("getNextUp", getNextUp = ({ x, y }) => ({
                x,
                y: y - 1,
            }));
            exports_3("getNextDown", getNextDown = ({ x, y }) => ({
                x,
                y: y + 1,
            }));
            exports_3("getXYOf", getXYOf = (e, key) => getAttribute(e, `data-${key}`));
            exports_3("updateAttribute", updateAttribute = (e, key, value) => e.setAttribute(`data-${key}`, value));
            exports_3("getAttribute", getAttribute = (e, key) => e.getAttribute(`data-${key}`));
        }
    };
});
System.register("index", ["utils"], function (exports_4, context_4) {
    "use strict";
    var utils_1, body, loading, container, restartButton, showLoading, hideLoading, getEmptyTile, swapEmptyWith, getElementsAroundEmptyTile, getFullElementFromCoordinates, resetTable, initGame, KeyHandler;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            alert(1);
            body = document.querySelector('body');
            loading = document.getElementById('loading');
            container = document.getElementById('container');
            restartButton = document.getElementById('restart');
            showLoading = () => {
                loading.classList.remove('hide');
                container.classList.add('hide');
            };
            hideLoading = () => {
                loading.classList.add('hide');
                container.classList.remove('hide');
            };
            getEmptyTile = () => document.querySelectorAll('[data-value="empty"]')[0];
            swapEmptyWith = (nextKey) => {
                const nextKeyCoordinates = getElementsAroundEmptyTile()[nextKey];
                if (utils_1.exists(nextKeyCoordinates)) {
                    const emptyTile = getEmptyTile();
                    const movingTile = getFullElementFromCoordinates({
                        x: nextKeyCoordinates.x,
                        y: nextKeyCoordinates.y,
                    });
                    utils_1.updateAttribute(emptyTile, 'data-value', movingTile.tileValue);
                    utils_1.updateAttribute(movingTile.element, 'data-value', 'empty');
                    emptyTile.innerHTML = `${movingTile.tileValue}`;
                    movingTile.element.innerHTML = '';
                    return;
                }
                console.log('Invalid move', nextKeyCoordinates);
            };
            getElementsAroundEmptyTile = () => {
                const emptyTile = getEmptyTile();
                const x = parseInt(utils_1.getXYOf(emptyTile, 'x'));
                const y = parseInt(utils_1.getXYOf(emptyTile, 'y'));
                const position = { x, y };
                const nextLeftPosition = utils_1.getNextLeft(position);
                const nextRightPosition = utils_1.getNextRight(position);
                const nextUpPosition = utils_1.getNextUp(position);
                const nextDownPosition = utils_1.getNextDown(position);
                return {
                    nextLeftPosition,
                    nextRightPosition,
                    nextUpPosition,
                    nextDownPosition,
                };
            };
            getFullElementFromCoordinates = ({ x, y }) => {
                const elementSelector = `[data-x="${x}"][data-y="${y}"]`;
                const element = document.querySelector(elementSelector);
                return {
                    element,
                    tileValue: element.getAttribute('data-value'),
                };
            };
            resetTable = () => {
                showLoading();
                return new Promise((resolve) => {
                    const table = utils_1.generateRandomTable();
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
                    resolve(() => {
                        setTimeout(() => {
                            hideLoading();
                        }, 1500);
                    });
                });
            };
            initGame = () => __awaiter(void 0, void 0, void 0, function* () {
                yield resetTable();
            });
            restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener('click', resetTable);
            KeyHandler = {
                ArrowLeft: () => swapEmptyWith("nextRightPosition"),
                ArrowRight: () => swapEmptyWith("nextLeftPosition"),
                ArrowUp: () => swapEmptyWith("nextDownPosition"),
                ArrowDown: () => swapEmptyWith("nextUpPosition"),
            };
            body.addEventListener('keydown', (e) => {
                const pressedKey = e.key;
                if (KeyHandler.hasOwnProperty(pressedKey)) {
                    KeyHandler[pressedKey]();
                }
            });
            initGame();
        }
    };
});
//# sourceMappingURL=build.js.map