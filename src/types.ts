export type TileValue = string | number;

export type FullElement = {
	element: Element;
	tileValue: string;
};

export type Position = {
	x: number;
	y: number;
};

export type AvailableAttributeKey = 'data-value' | 'data-y' | 'data-y';

export type PressableKeys =
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'ArrowUp'
	| 'ArrowDown';

export type AvailableKeyHandlers = Record<PressableKeys, () => void>;
