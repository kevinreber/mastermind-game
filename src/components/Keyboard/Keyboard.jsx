import React from 'react';

/** Keyboard Component
 *
 * @param {number}      keyboardLength
 * @param {function}    handleClick
 * @param {boolean}     lockGameBoard
 */

const Keyboard = ({ keyboardLength, lockGameBoard, handleClick }) => {
	const numbers = [];
	for (let i = 0; i <= keyboardLength; i++) {
		numbers.push(
			<button
				key={i}
				disabled={lockGameBoard}
				onClick={() => handleClick(i)}
				className="keyboard-number number">
				{i}
			</button>
		);
	}

	let styles;
	switch (keyboardLength) {
		case keyboardLength === 9: // Hard
			styles = 'repeat(5, 1fr)';
			break;
		case keyboardLength === 7: // Medium
			styles = 'repeat(4, 1fr)';
			break;
		default:
			// Easy
			styles = 'repeat(3, 1fr)';
	}

	return (
		<div
			id="keyboard"
			style={{ gridTemplateColumns: styles }}
			className="keys container">
			{numbers}
		</div>
	);
};

export default Keyboard;
