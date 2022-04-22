import { Avatar } from '../Avatar';
import { calculateAverage } from '../../utils/mathHelpers';

export const ProfileCard = ({ student }) => {
	return (
		<div>
			<Avatar avatarURL={student.pic} />
			<div>
				<h1>{`${student.firstName} ${student.lastName}`}</h1>
				<ul>
					<li>Email: {student.email}</li>
					<li>Company: {student.company}</li>
					<li>Skill: {student.skill}</li>
					<li>Average: {calculateAverage(student.grades)}%</li>
				</ul>
			</div>
		</div>
	);
};
