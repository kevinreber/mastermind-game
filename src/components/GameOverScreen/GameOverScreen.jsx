import React from 'react';

/** Screen that renders player results when game is over.
 *
 * @param {boolean}  	playerWin
 * @param {number}	 	highScore
 * @param {number}	 	playerScore
 * @param {function}	playNewGame
 */

const PLAYER_WIN = 'rgba(159, 230, 159, .9)';
const PLAYER_LOSE = 'rgba(228, 117, 122, .9)';

const GameOverScreen = ({
	playerWin = false,
	highScore = null,
	playerScore = null,
	playNewGame,
}) => {
	const PlayerWinHeader =
		playerScore > highScore ? (
			<>
				<h1 className="txt-win txt-results">NEW BEST SCORE!</h1>
				<h3 className="txt-win txt-results">{playerScore} attempts</h3>
			</>
		) : (
			<h1 className="txt-win txt-results">YOU WIN!</h1>
		);

	return (
		<div
			id="overlay"
			className="overlay-game-over"
			style={{ backgroundColor: playerWin ? PLAYER_WIN : PLAYER_LOSE }}>
			<div className="overlay-content-container">
				<div className="overlay-content">
					{playerWin ? (
						PlayerWinHeader
					) : (
						<h1 className="txt-lose txt-results">YOU LOSE!</h1>
					)}
					<button
						id="btn-game-over"
						onClick={playNewGame}
						className="btn reset">
						PLAY AGAIN?
					</button>
				</div>
			</div>
		</div>
	);
};

export default GameOverScreen;
