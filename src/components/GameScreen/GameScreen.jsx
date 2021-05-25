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
import ResultsScreen from '../ResultsScreen';

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
	const [timerOn, setTimerOn] = useState(true);
	const [showAttemptResults, setShowAttemptResults] = useState(false);

	let timeout;
	const clearTimer = () => {
		console.log('clearing out timer', timeout);
		clearTimeout(timeout);
		// let id = window.setTimeout(() => {}, 0);
		// while (id--) {
		// 	window.clearTimeout(id);
		// 	console.log('cleared timer', count);
		// 	setCount(count + 1);
		// }
	};

	// TODO
	// checkIfBestScoreExists();
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
			setTimerOn(true);
		}
	}, [isLoading]);

	useEffect(() => {
		// Once player has made all guesses
		if (playerGuessIndex === 4) {
			if (timerOn) {
				clearTimer();
				setTimerOn(false);
			}

			setLockGameBoard(true);
			handleGuesses();
		}
	}, [playerGuessIndex]);

	useEffect(() => {
		// When timer is done and player hasn't finished their guesses
		if (!timerOn && playerGuessIndex !== 4) {
			setLockGameBoard(true);
			handleGuesses();
		}
	}, [timerOn]);

	useEffect(() => {
		// When timer is on
		if (timerOn) {
			timeout = setTimeout(() => {
				if (!gameOver) {
					setTimerOn(false);
				}
			}, difficulty.timer * 1000);
		}
	}, [timerOn]);

	useEffect(() => {
		// When game is over
		if (gameOver) {
			clearTimer();
			if (playerAttempts.length >= 10) {
				setTimeout(() => {
					setPlayerResult('lose');
				}, 3000);
			} else {
				setTimeout(() => {
					setPlayerResult('win');
				}, 3000);
			}
		}
	}, [gameOver, playerAttempts]);

	const handleNewGame = () => {
		const RESET_GUESSES = ['-', '-', '-', '-'];
		setPlayerGuesses(RESET_GUESSES);
		setPlayerGuessIndex(0);
		setPlayerAttempts([]);
		setGameOver(false);
		setIsLoading(true);
		setPlayerResult(null);
		clearTimer();
	};

	const startNewAttempt = () => {
		const RESET_GUESSES = ['-', '-', '-', '-'];

		setPlayerGuesses(RESET_GUESSES);
		setPlayerGuessIndex(0);
		setLockGameBoard(false);

		clearTimer();
		setTimerOn(true);
		setShowAttemptResults(false);
	};

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
			updateUserAttempts(playerGuesses);

			// All player attempts used - End of game
			if (playerAttempts.length >= 9) {
				setGameOver(true);
				return;
			}
			setShowAttemptResults(true);
		}
	};

	const updateUserAttempts = (currentAttemptValues) => {
		const attemptData = handleAttemptData(answers, currentAttemptValues);
		console.log({ attemptData, playerAttempts });
		setPlayerAttempts((attempts) => [...attempts, attemptData]);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			{/* <!-- Overlay --> */}
			{playerResult && gameOver && (
				<GameOverScreen
					playerWin={playerResult === 'win'}
					highScore={playerBestScore}
					playerScore={playerAttempts.length}
					playNewGame={handleNewGame}
				/>
			)}

			{showAttemptResults && playerAttempts.length && !gameOver && (
				<ResultsScreen
					guesses={playerAttempts[playerAttempts.length - 1].values}
					existing={playerAttempts[playerAttempts.length - 1].exist}
					matches={playerAttempts[playerAttempts.length - 1].location}
					handleClick={startNewAttempt}
					handleReset={handleNewGame}
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
							<span id="attempts-left">{`${
								10 - playerAttempts.length > 0 ? 10 - playerAttempts.length : 0
							}`}</span>
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
					<Timer seconds={difficulty.timer} renderProgress={!lockGameBoard} />
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
