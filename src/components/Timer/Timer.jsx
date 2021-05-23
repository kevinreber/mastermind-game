import React from 'react';

const Timer = () => {
	return (
		<div class="timer-container">
			<svg viewBox="0 0 75 75" class="progress">
				<path
					class="progress-bg"
					d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<path
					class="progress-bar"
					stroke-dasharray="100, 100"
					d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
			</svg>
		</div>
	);
};

export default Timer;
