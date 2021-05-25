// Constants
import { BASE_URL } from '../../config/constants';

export const fetchRandomNumbers = async (maxNumber) => {
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
		console.error('ERROR CALLING API!');
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

/** Compares answers to users guesses.
 *
 * @param {array} answers Array of numbers as strings.
 * @param {array} guesses Array of numbers
 * @returns {boolean}
 */
export const checkAnswers = (answers, guesses) => {
	for (let i = 0; i < answers.length; i++) {
		if (Number(answers[i]) !== Number(guesses[i])) return false;
	}
	return true;
};

export const handleAttemptData = (answers, values) => {
	let exist = 0;
	let location = 0;

	for (let i = 0; i < values.length; i++) {
		if (Number(answers[i]) === Number(values[i])) {
			exist++;
			location++;
		} else if (values.includes(Number(answers[i]))) {
			exist++;
		}
	}

	return { values, exist, location };
};

export async function toggleAnswers() {
	const cards = document.querySelectorAll(
		'#random-numbers > .card.answer-card'
	);
	for (let [i, card] of cards.entries()) {
		let flip = flipCard(card);
		let timer = setTimeout(flip, i * 500);
		await timer;
	}
}

function flipCard(card) {
	return function () {
		card.classList.toggle('flip');
	};
}
