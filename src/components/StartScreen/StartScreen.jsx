import React, { useState, Fragment } from 'react';
import './StartScreen.scss';

// Constants
import { DIFFICULTY_LEVELS, INSTRUCTIONS_LIST } from '../../config/constants';

/** Overlay Component
 *
 * @param {any}         content		Content that displays inside Modal.
 * @param {function}    onDismiss  	Function that closes Modal component.
 */

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
