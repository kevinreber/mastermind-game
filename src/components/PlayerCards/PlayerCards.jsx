import React from 'react';

/** Player Cards
 *
 * @param {array}   playerGuesses     Array of numbers.
 */
const PlayerCards = ({ playerGuesses }) => {
	return (
		<div id="players-guesses" className="container">
			{playerGuesses.map((number, idx) => (
				<p id={idx} className="player-guess number shrink">
					{number}
				</p>
			))}
		</div>
	);
};

export default PlayerCards;
