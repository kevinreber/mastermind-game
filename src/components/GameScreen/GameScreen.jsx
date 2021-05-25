import React, { useState, useEffect } from 'react';

// Utils
import {
	fetchRandomNumbers,
	checkAnswers,
	handleAttemptData,
} from '../lib/utils';

// Components
import AnswerCards from '../AnswerCards';
import PlayerCards from '../PlayerCards';
import PlayerHistoryTable from '../PlayerHistoryTable';
import Timer from '../Timer';
import Keyboard from '../Keyboard/Keyboard';
import Loader from '../Loader/Loader';
import GameOverScreen from '../GameOverScreen/GameOverScreen';

/** Game Screen renders when user begins game.
 *
 * @param {object}  difficulty
 * @param {number}  playerBestScore
 */

const PLAYER_GUESS_DEFAULT = ['-', '-', '-', '-'];

const GameScreen = ({ difficulty, playerBestScore }) => {
	const [answers, setAnswers] = useState([]);
	const [playerGuesses, setPlayerGuesses] = useState(PLAYER_GUESS_DEFAULT);
	const [playerGuessIndex, setPlayerGuessIndex] = useState(0);
	const [playerAttempts, setPlayerAttempts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lockGameBoard, setLockGameBoard] = useState(true);
	const [playerResult, setPlayerResult] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	// TODO
	// checkIfBestScoreExists();
	// startTimerBar(selectedDifficulty.timer);
	// }

	useEffect(() => {
		const getData = async () => {
			const randomNumbers = await fetchRandomNumbers(difficulty.keyboardMax);
			setAnswers(randomNumbers);
			setLockGameBoard(false);
			setIsLoading(false);
		};
		if (isLoading) {
			getData();
		}
	}, [isLoading]);

	useEffect(() => {
		if (playerGuessIndex === 4) {
			setLockGameBoard(true);
			handleGuesses();
		}
	}, [playerGuessIndex]);

	const handleNewGame = () => {
		const RESET_GUESSES = ['-', '-', '-', '-'];
		setPlayerGuesses(RESET_GUESSES);
		setPlayerGuessIndex(0);
		setPlayerAttempts([]);
		setGameOver(false);
		setIsLoading(true);
		setPlayerResult(null);
	};

	useEffect(() => {
		if (gameOver) {
			console.log('Game Over!');
			if (playerAttempts.length === 10) {
				console.log('you lose!');
                setTimeout(()=> {
				setPlayerResult('lose');
                }, 3000)
			} else {
				console.log('you win!');
                setTimeout(()=> {
				setPlayerResult('win');
                }, 3000)
			}
		}
	}, [gameOver, playerAttempts]);

	const handleClick = (number) => {
		const tempGuesses = playerGuesses;
		tempGuesses[playerGuessIndex] = number;
		setPlayerGuesses(tempGuesses);
		setPlayerGuessIndex(playerGuessIndex + 1);
	};

	const handleGuesses = () => {
		if (checkAnswers(answers, playerGuesses)) {
			setGameOver(true);
		} else {
			const RESET_GUESSES = ['-', '-', '-', '-'];
			updateUserAttempts(playerGuesses);

			// All player attempts used - End of game
			if (playerAttempts.length === 9) {
				setGameOver(true);
				return;
			}

			setPlayerGuesses(RESET_GUESSES);
			setPlayerGuessIndex(0);
			setLockGameBoard(false);
		}
	};

	const updateUserAttempts = (currentAttemptValues) => {
		const attemptData = handleAttemptData(answers, currentAttemptValues);
		setPlayerAttempts((attempts) => [...attempts, attemptData]);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			{/* <!-- Overlay --> */}
			{playerResult && (
				<GameOverScreen
					playerWin={playerResult === 'win'}
					highScore={playerBestScore}
					playerScore={playerAttempts.length}
					playNewGame={handleNewGame}
				/>
			)}
			{/* <!-- /Overlay --> */}

			<div id="game-container" className="game-container container">
				{/* <!-- Header --> */}
				<section
					className={`header ${answers.length ? 'animated fadeInUp' : 'hide'}`}>
					<h1 className="game-title">MASTERMIND</h1>
					<p className="best-score">
						BEST SCORE: <span id="best-score">{playerBestScore}</span>
					</p>
					<div className="attempts-container container">
						<h3>
							Attempts Left:{' '}
							<span id="attempts-left">{10 - playerAttempts.length}</span>
						</h3>
					</div>
				</section>
				{/* <!-- /Header --> */}

				{/* <!-- Gameboard --> */}
				<section
					id="gameboard"
					className={`container ${
						answers.length ? 'animated fadeInUp' : 'hide'
					}`}>
					{answers.length && (
						<AnswerCards answers={answers} gameOver={gameOver} />
					)}
					{answers.length && (
						<PlayerCards
							playerGuesses={playerGuesses}
							currentGuess={playerGuessIndex}
						/>
					)}
				</section>
				{/* <!-- /Gameboard --> */}

				{/* <!-- Player History --> */}
				<section
					id="history"
					className={`container ${
						answers.length ? 'animated fadeInUp' : 'hide'
					}`}>
					{answers.length && <PlayerHistoryTable attempts={playerAttempts} />}
				</section>
				{/* <!-- /Player History --> */}

				{/* <!-- Timer --> */}
				<section
					id="timer"
					className={`container ${
						answers.length ? 'animated fadeInUp' : 'hide'
					}`}>
					<Timer />
				</section>
				{/* <!-- /Timer --> */}

				{/* <!-- Keyboard --> */}
				<section
					className={`keyboard-container ${
						answers.length ? 'animated fadeInUp' : 'hide'
					}`}>
					<h3 className="keyboard-header">GUESS THE CODE ABOVE</h3>
					<Keyboard
						lockGameBoard={lockGameBoard}
						keyboardLength={difficulty.keyboardMax}
						handleClick={handleClick}
					/>
				</section>
				{/* <!-- Keyboard --> */}
			</div>
		</>
	);
};

export default GameScreen;
