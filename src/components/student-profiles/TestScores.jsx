// Display test score conditionally upon expanded state
export const TestScores = ({ grades, expanded }) => {
	return (
		<>
			{expanded && (
				<ul className={'profile-card-test-scores'}>
					{grades.map((testScore, index) => {
						return (
							<li key={`test-score-${index + 1}`}>
								Test {index + 1}: <span>{testScore}%</span>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};
