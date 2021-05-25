import React from 'react';

const Timer = () => {
	return (
		<div className="timer-container">
			<svg viewBox="0 0 75 75" className="progress">
				<path
					className="progress-bg"
					d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<path
					className="progress-bar"
					strokeDasharray="100, 100"
					d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
			</svg>
		</div>
	);
};

export default Timer;
