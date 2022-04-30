import { useEffect, useState } from 'react';
import './App.css';
import { StudentProfiles } from './components/student-profiles/StudentProfiles';
import { fetchStudentData } from './features/studentsSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const studentData = useSelector((state) => state.studentData.students);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(fetchStudentData());
	}, [dispatch]);

	useEffect(() => {
		if (studentData !== undefined && studentData.length !== 0) {
			setIsLoading(false);
		}
	}, [studentData]);

	return (
		<div className='App'>
			<main>{!isLoading && <StudentProfiles />}</main>
		</div>
	);
}

export default App;
