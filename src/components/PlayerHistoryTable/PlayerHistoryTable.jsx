import React from 'react';

const PlayerHistoryTable = () => {
	const attempts = [];
	for (let i = 0; i < 9; i++) {
		attempts.push(
			<tr className="table-attempt" key={i}>
				<td className="attempt">----</td>
				<td className="attempt">--</td>
				<td className="attempt">--</td>
			</tr>
		);
	}

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
				<tbody>{attempts}</tbody>
			</table>
		</div>
	);
};

export default PlayerHistoryTable;
