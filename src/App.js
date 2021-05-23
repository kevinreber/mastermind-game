import React, { useState, useEffect } from 'react';
import './App.scss';

// Components
import Overlay from './components/Overlay';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

// Providers
import { OverlayContext } from './store/OverlayContext';

// Constants
import { OVERLAY_INITIAL_VALUES, GAME_DIFFICULTIES } from './config/constants';

function App() {
	const [gameDifficulty, setGameDifficulty] = useState(null);
	const [overlay, setOverlay] = useState(OVERLAY_INITIAL_VALUES);
	const overlayValues =
		(() => ({ overlay, setOverlay }), [overlay, setOverlay]);
	const playerBestScore = localStorage.getItem('bestScore')
		? JSON.parse(localStorage.bestScore)
		: '-';
	const toggleModal = () => setOverlay((st) => ({ ...st, isOpen: !st.isOpen }));

	const handleSelectedDifficulty = (difficulty) => {
		setGameDifficulty(GAME_DIFFICULTIES[difficulty.toLowerCase()]);
	};

	useEffect(() => {
		setOverlay((st) => ({
			...st,
			content: <StartScreen selectDifficulty={handleSelectedDifficulty} />,
		}));
	}, []);

	return (
		<div className="App">
			<OverlayContext.Provider value={overlayValues}>
				{overlay.isOpen && overlay.content && !gameDifficulty && (
					<Overlay content={overlay.content} onDismiss={toggleModal}></Overlay>
				)}
				{gameDifficulty && (
					<GameScreen
						difficulty={gameDifficulty}
						playerBestScore={playerBestScore}
					/>
				)}
			</OverlayContext.Provider>
		</div>
	);
}

export default App;
