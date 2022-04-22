import { useEffect, useState } from 'react';
import './App.css';
import { StudentProfiles } from './components/student-profiles/StudentProfiles';
import { fetchStudentData } from './features/studentsSlice';
import { useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStudentData());
		// fetch('https://api.hatchways.io/assessment/students')
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		setData(data);
		// 	})
		// 	.catch((err) => {
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 	});
	}, []);
	return (
		<div className='App'>
			<main>
				<StudentProfiles />
			</main>
		</div>
	);
}

export default App;
