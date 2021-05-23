import React, { useState, useEffect } from 'react';

// Utils
import { fetchRandomNumbers, checkAnswers } from '../lib/utils';

// Components
import AnswerCards from '../AnswerCards';
import PlayerCards from '../PlayerCards';
import PlayerHistoryTable from '../PlayerHistoryTable';
import Timer from '../Timer';
import Keyboard from '../Keyboard/Keyboard';
import Loader from '../Loader/Loader';

/**
 *
 * @param {object}  difficulty
 * @param {number}  playerBestScore
 */

const PLAYER_GUESS_DEFAULT = ['-', '-', '-', '-'];

const GameScreen = ({ difficulty, playerBestScore }) => {
	const [answers, setAnswers] = useState([]);
	const [playerGuesses, setPlayerGuesses] = useState(PLAYER_GUESS_DEFAULT);
	const [playerGuessIndex, setPlayerGuessIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [lockGameBoard, setLockGameBoard] = useState(true);
	const [gameOver, setGameOver] = useState(true);

	// async function startGame() {

	// TODO
	// checkIfBestScoreExists();
	// startTimerBar(selectedDifficulty.timer);
	// }

	useEffect(() => {
		const getData = async () => {
			const randomNumbers = await fetchRandomNumbers(difficulty.keyboardMax);
			setAnswers(randomNumbers);
			setLockGameBoard(false);
			setGameOver(false);
			setIsLoading(false);
		};
		if (isLoading) {
			getData();
		}
	}, []);

	useEffect(() => {
		if (playerGuessIndex === 4) {
			setLockGameBoard(true);
			handleGuesses();
		}
	}, [playerGuessIndex]);

	const handleClick = (number) => {
		const tempGuesses = playerGuesses;
		tempGuesses[playerGuessIndex] = number;
		setPlayerGuesses(tempGuesses);
		setPlayerGuessIndex(playerGuessIndex + 1);
	};

	const handleGuesses = () => {
		console.log('user used all guesses!');
		console.log(playerGuesses);
		if (checkAnswers(answers, playerGuesses)) {
			// TODO: Render win screen
			console.log('success!');
		} else {
			// TODO: Render attempts left screen
			console.log('try again!');
		}
	};
	console.log({ answers });
	if (isLoading) {
		return <Loader />;
	}

	return (
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
						Attempts Left: <span id="attempts-left">10</span>
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
				{answers.length && <AnswerCards answers={answers} />}
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
				{answers.length && <PlayerHistoryTable />}
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
	);
};

export default GameScreen;
