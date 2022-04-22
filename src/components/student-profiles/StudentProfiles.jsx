import { ProfileCard } from './ProfileCard';
import { useSelector } from 'react-redux';

export const StudentProfiles = () => {
	const studentsArr = useSelector((state) => state.studentData.students);
	console.log(studentsArr);
	return (
		<div>
			{studentsArr !== undefined &&
				studentsArr.map((item) => {
					return (
						<ProfileCard key={`student${item.id}`} student={item} />
					);
				})}
		</div>
	);
};
