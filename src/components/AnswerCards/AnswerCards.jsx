import React from 'react';

/** Answer Cards
 *
 * @param {array}   answers     Array of numbers.
 */
const AnswerCards = ({ answers }) => {
	return (
		<div id="random-numbers" className="container">
			{answers.map((number, idx) => (
				<div key={idx} className="card container">
					<p className="random-number card-face front number">{number}</p>
					<p className="random-number card-face back number">?</p>
				</div>
			))}
		</div>
	);
};

export default AnswerCards;
