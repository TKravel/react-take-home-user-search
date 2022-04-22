import { Avatar } from '../Avatar';
import { calculateAverage } from '../../utils/mathHelpers';
import { MinusIcon } from '../../svgs/MinusIcon';
import { useState } from 'react';

export const ProfileCard = ({ student }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded((prevValue) => {
			return !prevValue;
		});
	};
	return (
		<div className='profile-card'>
			<Avatar avatarURL={student.pic} cname='profile-card-avatar' />
			<div className='profile-card-details'>
				<h1>{`${student.firstName} ${student.lastName}`}</h1>
				<ul>
					<li>Email: {student.email}</li>
					<li>Company: {student.company}</li>
					<li>Skill: {student.skill}</li>
					<li>Average: {calculateAverage(student.grades)}%</li>
				</ul>
				<ul
					className={
						isExpanded
							? 'profile-card-test-scores scores-visible'
							: 'profile-card-test-scores'
					}
				>
					{student.grades.map((testScore, index) => {
						return (
							<li key={`test-score-${index + 1}`}>
								Test {index + 1}: <span>{testScore}%</span>
							</li>
						);
					})}
				</ul>
				<button className='expand-button' onClick={toggleExpand}>
					<div className='plus-icon-wrapper'>
						<MinusIcon
							cname={
								isExpanded
									? 'vert-minus-icon fade-expand-button'
									: 'vert-minus-icon'
							}
						/>
						<MinusIcon cname='hor-minus-icon' />
					</div>
				</button>
			</div>
		</div>
	);
};
