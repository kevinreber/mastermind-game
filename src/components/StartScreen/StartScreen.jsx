import React, { useState, Fragment } from 'react';
import './StartScreen.scss';

/** Modal Component
 *
 * @param {any}         content		Content that displays inside Modal.
 * @param {function}    onDismiss  	Function that closes Modal component.
 */

const DIFFICULTY_LEVELS = ['EASY', 'MEDIUM', 'HARD'];
const INSTRUCTIONS_LIST = [
	'Player has 10 attempts to guess the location of 4 numbers in limited time',
	'After each attempt player has 10 seconds to view their results',
	'Game ends when player runs out of attempts or matches all numbers',
];

const StartScreen = ({ selectDifficulty }) => {
	const [showInstructions, setShowInstructions] = useState(false);
	const toggleShowInstructions = () => setShowInstructions((show) => !show);

	return (
		<div id="home-screen" className="overlay-content-container">
			<div className="overlay-content animated hide fadeInUp">
				<h1 className="game-title start-screen">MASTERMIND</h1>
				<div className="difficulty-container">
					<h3>SELECT YOUR DIFFICULTY</h3>
					<div className="difficulty-options">
						{DIFFICULTY_LEVELS.map((level) => (
							<Fragment key={level}>
								<button onClick={() => selectDifficulty(level)}>{level}</button>
							</Fragment>
						))}
					</div>
				</div>
				<footer id="instructions" className="instructions">
					<button onClick={toggleShowInstructions} className="txt-instructions">
						INSTRUCTIONS
					</button>
					<ul
						className={`instructions-list ${
							showInstructions ? 'slideUp' : 'toggle-display'
						}`}>
						{INSTRUCTIONS_LIST.map((instruction, i) => (
							<Fragment key={i}>
								<li>{instruction}</li>
							</Fragment>
						))}
					</ul>
				</footer>
			</div>
		</div>
	);
};

export default StartScreen;
