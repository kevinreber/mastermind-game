import React, { useState, Fragment } from 'react';
import './StartScreen.scss';

// Constants
import { DIFFICULTY_LEVELS, INSTRUCTIONS_LIST } from '../../config/constants';

/** Overlay Component
 *
 * @param {function}   selectDifficulty
 * @param {boolean}    show
 */

const StartScreen = ({ selectDifficulty, show }) => {
	const [showInstructions, setShowInstructions] = useState(false);
	const toggleShowInstructions = () => setShowInstructions((show) => !show);

	return (
		<div
			id="overlay"
			style={{ display: show ? 'display' : 'none' }}
			className="overlay-default">
			<div id="home-screen" className="overlay-content-container">
				<div className="overlay-content animated hide fadeInUp">
					<h1 className="game-title start-screen">MASTERMIND</h1>
					<div className="difficulty-container">
						<h3>SELECT YOUR DIFFICULTY</h3>
						<div className="difficulty-options">
							{DIFFICULTY_LEVELS.map((level) => (
								<Fragment key={level}>
									<button className="difficulty-btn" onClick={() => selectDifficulty(level)}>
										{level}
									</button>
								</Fragment>
							))}
						</div>
					</div>
					<footer id="instructions" className={`instructions ${
								showInstructions ? 'slideUp' : ''
							}` }>
						<button
							onClick={toggleShowInstructions}
							className="txt-instructions">
							INSTRUCTIONS
						</button>
						<ul
							className={`instructions-list ${
								!showInstructions ? 'toggle-display' : ''
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
		</div>
	);
};

export default StartScreen;
