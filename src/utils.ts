import { MAX_XY, MIN_XY, TOTAL_TILES } from './constants';
import { AvailableAttributeKey, Position } from './types';

export const generateRandomTable = () => {
	const table: Array<number> = [];

	while (table.length < TOTAL_TILES) {
		const generated = Math.floor(Math.random() * TOTAL_TILES) + 1;

		if (table.indexOf(generated) === -1) {
			table.push(generated);
		}
	}

	return table;
};

export const exists = ({ x, y }: Position) =>
	x <= MAX_XY && y <= MAX_XY && x >= MIN_XY && y >= MIN_XY;

export const getNextLeft = ({ x, y }: Position) => ({
	x: x - 1,
	y,
});

export const getNextRight = ({ x, y }: Position) => ({
	x: x + 1,
	y,
});

export const getNextUp = ({ x, y }: Position) => ({
	x,
	y: y - 1,
});

export const getNextDown = ({ x, y }: Position) => ({
	x,
	y: y + 1,
});

export const getXYOf = (e: Element, key: string) =>
	getAttribute(e, `data-${key}` as AvailableAttributeKey);

export const updateAttribute = (
	e: Element,
	key: AvailableAttributeKey,
	value: string
) => e.setAttribute(`data-${key}`, value)!;

export const getAttribute = (e: Element, key: AvailableAttributeKey) =>
	e.getAttribute(`data-${key}`)!;
