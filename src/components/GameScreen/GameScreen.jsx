import React, { useState, useEffect } from 'react';

/**
 *
 * @param {object}  difficulty
 */

const BASE_URL = 'https://www.random.org/integers';

const fetchRandomNumbers = async (maxNumber) => {
	const params = `?num=4&min=0&max=${maxNumber}&col=1&base=16&format=plain&rnd=new`;
	const url = `${BASE_URL}/${params}`;
	try {
		const response = await fetch(url);
		console.log(response);
		if (response.status === 200) {
			const data = response.data.replace(/\s+/g, ''); //Remove spaces and carriage returns
			return [data];
			// gameData.randomAPIResults = [...data]; //Store API results
		}
	} catch (error) {
		//Fallback if error calling API
		console.error(error);
		alert('ERROR CALLING API!');
		return randomNumbersFallback(maxNumber);
	}
};

//Fallback if API call fails
const randomNumbersFallback = (number) => {
	const numbers = [];
	for (let i = 0; i < 4; i++) {
		numbers.push(generateRandomNumber(number).toString());
	}
	return numbers;
};

const generateRandomNumber = (number) => {
	return Math.floor(Math.random() * (number + 1));
};

const GameScreen = ({ difficulty }) => {
	const [answers, setAnswers] = useState([]);
	const [lockBoard, setLockBoard] = useState(true);
	const [gameOver, setGameOver] = useState(true);

	console.log(difficulty, answers);
	// async function startGame() {
	// 	const maxNumber = selectedDifficulty.keyboardMax;
	// 	const query = `?num=4&min=0&max=${maxNumber}&col=1&base=16&format=plain&rnd=new`;
	// 	const url = `https://www.random.org/integers/${query}`;

	// checkIfBestScoreExists();
	// renderGameBoard();
	// startTimerBar(selectedDifficulty.timer);
	// }

	useEffect(() => {
		const getData = async () => {
			const randomNumbers = await fetchRandomNumbers(difficulty.keyboardMax);
			setAnswers(randomNumbers);
			setLockBoard(false);
			setGameOver(false);
		};
		getData();
	}, []);
	console.log({ answers });
	return (
		<div>{answers.length > 0 && answers.map((answer) => <p>{answer}</p>)}</div>
	);
};

export default GameScreen;
