import React from 'react';

/** Screen that renders player's attempt results.
 *
 * @param {number}  	guesses
 * @param {number}	 	existing
 * @param {number}	 	matches
 * @param {function}	handleClick
 * @param {function}	handleReset
 */

const parseGuess = (guesses) => {
	let string = '';

	for (let i = 0; i < guesses.length; i++) {
		if (guesses[i] !== '-' && i < guesses.length - 1) {
			string = guesses[i] + '-';
		} else string += guesses[i];
	}
};

const ResultsScreen = ({
	guesses,
	existing,
	matches,
	handleClick,
	handleReset,
}) => {
	return (
		<div
			id="overlay"
			className="overlay-game-over"
			style={{ backgroundColor: 'rgba(77, 77, 77, .9)' }}>
			<div className="overlay-content-container">
				<div className="overlay-content">
					<h1 className="txt-results txt-correct-header">YOU GUESSED</h1>
					<div className="txt-correct-container">
						<h2 className="txt-player-input">{parseGuess(guesses)}</h2>
						<h3 className="txt-correct">
							{existing}/4 Numbers That Exist
							<br />
							{matches}/4 Numbers Correct Location
						</h3>
					</div>
					<button
						id="btn-continue"
						onClick={handleClick}
						className="btn continue">
						CONTINUE
					</button>
					<button id="btn-reset" onClick={handleReset} className="btn reset">
						RESTART
					</button>
				</div>
			</div>
		</div>
	);
};

export default ResultsScreen;
