import React, { useState } from 'react';
import './App.css';

// Components
import Overlay from './components/Overlay';

// Providers
import { OverlayContext } from './store/OverlayContext';

const OVERLAY_INITIAL_VALUES = {
	isOpen: false,
	content: null,
};

function App() {
	const [overlay, setOverlay] = useState(OVERLAY_INITIAL_VALUES);
	const overlayValues =
		(() => ({ overlay, setOverlay }), [overlay, setOverlay]);

	const toggleModal = () => setOverlay((st) => ({ ...st, isOpen: !st.isOpen }));

	return (
		<div className="App">
			<OverlayContext.Provider value={overlayValues}>
				{overlay.isOpen && overlay.content && (
					<Overlay content={'hello world'} onDismiss={toggleModal}></Overlay>
				)}
			</OverlayContext.Provider>
		</div>
	);
}

export default App;
