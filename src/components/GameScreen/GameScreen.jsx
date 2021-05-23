import React, { useState, useEffect } from 'react';

// Utils
import { fetchRandomNumbers } from '../lib/utils';

// Components
import AnswerCards from '../AnswerCards';
import Timer from '../Timer';

/**
 *
 * @param {object}  difficulty
 */

const GameScreen = ({ difficulty }) => {
	const [answers, setAnswers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lockBoard, setLockBoard] = useState(true);
	const [gameOver, setGameOver] = useState(true);

	console.log(difficulty, answers);
	// async function startGame() {

	// TODO
	// checkIfBestScoreExists();
	// startTimerBar(selectedDifficulty.timer);
	// }

	useEffect(() => {
		const getData = async () => {
			const randomNumbers = await fetchRandomNumbers(difficulty.keyboardMax);
			setAnswers(randomNumbers);
			setLockBoard(false);
			setGameOver(false);
			setIsLoading(false);
		};
		if (isLoading) {
			getData();
		}
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div id="game-container" className="game-container container">
			{/* <!-- Header --> */}
			<section
				className={`header ${answers.length ? 'animated fadeInUp' : 'hide'}`}>
				<h1 className="game-title">MASTERMIND</h1>
				<p className="best-score">
					BEST SCORE: <span id="best-score"></span>
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
				<div id="players-guesses" className="container"></div>
			</section>
			{/* <!-- /Gameboard --> */}

			{/* <!-- Player History --> */}
			<section
				id="history"
				className={`container ${
					answers.length ? 'animated fadeInUp' : 'hide'
				}`}>
				<div className="table container">
					<table id="history-tables"></table>
				</div>
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
				<div id="keyboard" className="keys container"></div>
			</section>
			{/* <!-- Keyboard --> */}
		</div>
	);
};

export default GameScreen;
