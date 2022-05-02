import { Avatar } from '../Avatar';
import { calculateAverage } from '../../utils/mathHelpers';
import { MinusIcon } from '../../svgs/MinusIcon';
import { useState } from 'react';
import { TestScores } from './TestScores';
import { TagComponent } from './TagComponent';

// student profile card
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
				<TestScores grades={student.grades} expanded={isExpanded} />
				<TagComponent studentID={student.id} />
				<button
					className='expand-button'
					onClick={toggleExpand}
					aria-label='View test scores'
				>
					<div className='plus-icon-wrapper'>
						<MinusIcon
							cname={
								isExpanded
									? 'vertical-bar-icon fade-expand-button'
									: 'vertical-bar-icon'
							}
						/>
						<MinusIcon cname='horizontal-bar-icon' />
					</div>
				</button>
			</div>
		</div>
	);
};
