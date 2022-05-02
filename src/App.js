import { useEffect, useState } from 'react';
import './App.css';
import { StudentProfiles } from './components/student-profiles/StudentProfiles';
import { fetchStudentData } from './features/studentsSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const studentData = useSelector((state) => state.studentData.students);
	const [isLoading, setIsLoading] = useState(true);

	// dispatch createAsyncThunk on app load
	useEffect(() => {
		dispatch(fetchStudentData());
	}, [dispatch]);

	// check if store has been populated and ready for display
	useEffect(() => {
		if (studentData !== undefined && studentData.length !== 0) {
			setIsLoading(false);
		}
	}, [studentData]);

	return (
		<div className='App' data-testid='app-rendered'>
			<main>{!isLoading && <StudentProfiles />}</main>
		</div>
	);
}

export default App;
