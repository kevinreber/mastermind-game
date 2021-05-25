import React from 'react';

/** Attempts shown in PlayerHistoryTable
 * GameScreen -> PlayerHistoryTable -> PlayerHistoryTableAttempts
 *
 * @param {array}	attempts		Array of objects containing attempt data.
 * @param {number}	currentAttempt	Attempt number player is currently on.
 */

const DEFAULT_ATTEMPTS = {
	values: '----',
	exist: '--',
	location: '--',
};

const formatValues = (values) => {
	return values.join('-');
};

const PlayerHistoryTableAttempts = ({ attempts, currentAttempt }) => {
	const renderAttempts = [];
	for (let i = 0; i < 9; i++) {
		let { values, exist, location } = attempts[i]?.values
			? attempts[i]
			: DEFAULT_ATTEMPTS;

		// format values if user has made attempt
		values = values !== DEFAULT_ATTEMPTS.values ? formatValues(values) : values;

		renderAttempts.push(
			<tr className="table-attempt" key={i}>
				<td className="attempt">{values}</td>
				<td className="attempt">{exist}</td>
				<td className="attempt">{location}</td>
			</tr>
		);
	}

	return <tbody>{renderAttempts}</tbody>;
};

export default PlayerHistoryTableAttempts;
