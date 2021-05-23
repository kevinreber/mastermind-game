import React from 'react';

/** Player Cards
 *
 * @param {array}   playerGuesses     Array of numbers.
 * @param {number}  currentGuess	  Current Guess player is on.
 */
const PlayerCards = ({ playerGuesses, currentGuess }) => {
	return (
		<div id="players-guesses" className="container">
			{playerGuesses.map((number, idx) => (
				<p
					id={idx}
					key={idx}
					className={`player-guess number ${
						idx <= currentGuess ? 'grow' : 'shrink'
					}`}>
					{number}
				</p>
			))}
		</div>
	);
};

export default PlayerCards;
