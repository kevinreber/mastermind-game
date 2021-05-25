import React, { useState } from 'react';
import './App.scss';

// Components
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

// Constants
import { GAME_DIFFICULTIES } from './config/constants';

function App() {
	const [gameDifficulty, setGameDifficulty] = useState(null);
	const playerBestScore = localStorage.getItem('bestScore')
		? JSON.parse(localStorage.bestScore)
		: '-';

	const handleSelectedDifficulty = (difficulty) => {
		setGameDifficulty(GAME_DIFFICULTIES[difficulty.toLowerCase()]);
	};
	return (
		<div className="App">
			{gameDifficulty ? (
				<GameScreen
					difficulty={gameDifficulty}
					playerBestScore={playerBestScore}
					goToStartScreen={() => setGameDifficulty(null)}
				/>
			) : (
				<StartScreen
					selectDifficulty={handleSelectedDifficulty}
					show={!gameDifficulty}
				/>
			)}
		</div>
	);
}

export default App;
