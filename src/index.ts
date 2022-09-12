import { Keys } from './constants';
import {
	FullElement,
	Position,
	PressableKeys,
	AvailableKeyHandlers,
} from './types';
import {
	exists,
	generateRandomTable,
	getNextDown,
	getNextLeft,
	getNextRight,
	getNextUp,
	getXYOf,
	updateAttribute,
} from './utils';

alert(1);

const body = document.querySelector('body');
const loading = document.getElementById('loading');
const container = document.getElementById('container');
const restartButton = document.getElementById('restart');

const showLoading = () => {
	loading!.classList.remove('hide');
	container!.classList.add('hide');
};

const hideLoading = () => {
	loading!.classList.add('hide');
	container!.classList.remove('hide');
};

const getEmptyTile = (): Element =>
	document.querySelectorAll('[data-value="empty"]')[0] as Element;

const swapEmptyWith = (nextKey: Keys) => {
	const nextKeyCoordinates = getElementsAroundEmptyTile()[nextKey]!;

	if (exists(nextKeyCoordinates)) {
		const emptyTile = getEmptyTile();

		const movingTile = getFullElementFromCoordinates({
			x: nextKeyCoordinates.x,
			y: nextKeyCoordinates.y,
		});

		updateAttribute(emptyTile, 'data-value', movingTile.tileValue);
		updateAttribute(movingTile.element, 'data-value', 'empty');

		emptyTile.innerHTML = `${movingTile.tileValue}`;
		movingTile.element.innerHTML = '';

		return;
	}

	console.log('Invalid move', nextKeyCoordinates);
};

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
	};
};

const getFullElementFromCoordinates = ({ x, y }: Position): FullElement => {
	const elementSelector = `[data-x="${x}"][data-y="${y}"]`;
	const element = document.querySelector(elementSelector) as Element;

	return {
		element,
		tileValue: element.getAttribute('data-value')!,
	};
};

const resetTable = () => {
	showLoading();

	return new Promise((resolve) => {
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

		resolve(() => {
			setTimeout(() => {
				hideLoading();
			}, 1500);
		});
	});
};

const initGame = async () => {
	await resetTable();
};

restartButton?.addEventListener('click', resetTable);

const KeyHandler: AvailableKeyHandlers = {
	ArrowLeft: () => swapEmptyWith(Keys.RIGHT),
	ArrowRight: () => swapEmptyWith(Keys.LEFT),
	ArrowUp: () => swapEmptyWith(Keys.DOWN),
	ArrowDown: () => swapEmptyWith(Keys.UP),
};

body!.addEventListener('keydown', (e) => {
	const pressedKey = e.key as PressableKeys;

	if (KeyHandler.hasOwnProperty(pressedKey)) {
		KeyHandler[pressedKey]();
	}
});

initGame();
