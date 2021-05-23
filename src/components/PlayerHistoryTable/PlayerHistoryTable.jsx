import React from 'react';

// Components
import PlayerHistoryTableAttempts from '../PlayerHistoryTableAttempts';

const PlayerHistoryTable = ({ attempts, currentAttempt }) => {
	return (
		<div className="table container">
			<table id="history-tables">
				<thead>
					<tr className="table-titles-container">
						<td className="table-title">Attempts</td>
						<td className="table-title">Exist</td>
						<td className="table-title">Location</td>
					</tr>
				</thead>
				<PlayerHistoryTableAttempts
					attempts={attempts}
					currentAttempt={currentAttempt}
				/>
			</table>
		</div>
	);
};

export default PlayerHistoryTable;
