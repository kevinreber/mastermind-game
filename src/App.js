import React, { useState, useEffect } from 'react';
import './App.scss';

// Components
import Overlay from './components/Overlay';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

// Providers
import { OverlayContext } from './store/OverlayContext';

const OVERLAY_INITIAL_VALUES = {
	isOpen: true,
	content: null,
};

const GAME_DIFFICULTIES = {
	easy: {
		keyboardMax: 5,
		timer: 25,
	},
	medium: {
		keyboardMax: 7,
		timer: 20,
	},
	hard: {
		keyboardMax: 9,
		timer: 15,
	},
};

function App() {
	const [gameDifficulty, setGameDifficulty] = useState(null);
	const [overlay, setOverlay] = useState(OVERLAY_INITIAL_VALUES);
	const overlayValues =
		(() => ({ overlay, setOverlay }), [overlay, setOverlay]);

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
				{gameDifficulty && <GameScreen difficulty={gameDifficulty} />}
			</OverlayContext.Provider>
		</div>
	);
}

export default App;
