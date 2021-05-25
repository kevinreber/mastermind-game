import React, { useEffect } from 'react';

import { toggleAnswers } from '../lib/utils';

/** Answer Cards
 *
 * @param {array}   	answers     Array of numbers.
 * @param {boolean}		gameOver	Boolean if game is over.
 */

const AnswerCards = ({ answers, gameOver }) => {
	useEffect(() => {
		if (gameOver) {
			toggleAnswers();
		}
	}, [gameOver]);

	return (
		<div id="random-numbers" className="container">
			{answers.map((number, idx) => (
				<div key={idx} className="card container answer-card">
					<p className="random-number card-face front number">{number}</p>
					<p className="random-number card-face back number">?</p>
				</div>
			))}
		</div>
	);
};

export default AnswerCards;
