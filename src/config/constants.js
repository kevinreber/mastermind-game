export const OVERLAY_INITIAL_VALUES = {
	isOpen: true,
	content: null,
};

export const GAME_DIFFICULTIES = {
	easy: {
		keyboardMax: 5,
		timer: 30,
	},
	medium: {
		keyboardMax: 7,
		timer: 25,
	},
	hard: {
		keyboardMax: 9,
		timer: 20,
	},
};

export const DIFFICULTY_LEVELS = ['EASY', 'MEDIUM', 'HARD'];
export const INSTRUCTIONS_LIST = [
	'Player has 10 attempts to guess the location of 4 numbers in limited time',
	'After each attempt player has 10 seconds to view their results',
	'Game ends when player runs out of attempts or matches all numbers',
];

export const BASE_URL = 'https://www.random.org/integers';
