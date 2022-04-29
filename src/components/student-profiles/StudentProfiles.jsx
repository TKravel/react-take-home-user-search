import { ProfileCard } from './ProfileCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextInput } from '../TextInput';
import { setFilterConditions } from '../../utils/queryHelpers';

export const StudentProfiles = () => {
	const studentsArr = useSelector((state) => state.studentData.students);
	const [nameInputState, setNameInputState] = useState('');
	const [tagInputState, setTagInputState] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const handleInputState = (e) => {
		if (e.target.id === 'nameInput') {
			setNameInputState(e.target.value);
		} else if (e.target.id === 'tagInput') {
			setTagInputState(e.target.value);
		}
	};

	useEffect(() => {
		const nameQuery = nameInputState.length > 0 ? true : false;
		const tagQuery = tagInputState.length > 0 ? true : false;
		let queryResults = [];

		queryResults = studentsArr.filter((student) => {
			return setFilterConditions(nameInputState, tagInputState, student);
		});

		// const containsStr = (data, searchStr) => {
		// 	if (data === undefined) {
		// 		return;
		// 	} else if (Array.isArray(data)) {
		// 		let matchResults = false;
		// 		for (let value of data) {
		// 			if (value.toLowerCase().includes(searchStr.toLowerCase())) {
		// 				matchResults = true;
		// 			}
		// 		}
		// 		return matchResults;
		// 	} else {
		// 		return data.toLowerCase().includes(searchStr.toLowerCase());
		// 	}
		// };

		// if (!nameQuery && !tagQuery && searchResults.length !== 0) {
		// 	return setSearchResults([]);
		// } else if (nameQuery && tagQuery) {
		// 	queryResults = studentsArr.filter((student) => {
		// 		return (
		// 			(containsStr(student.firstName, nameInputState) ||
		// 				containsStr(student.lastName, nameInputState)) &&
		// 			containsStr(student.tags, tagInputState)
		// 		);
		// 	});
		// } else if (nameQuery && !tagQuery) {
		// 	queryResults = studentsArr.filter((student) => {
		// 		return containsStr(student.firstName, nameInputState);
		// 	});
		// } else if (!nameQuery && tagQuery) {
		// 	queryResults = studentsArr.filter((student) => {
		// 		return containsStr(student.tags, tagInputState);
		// 	});
		// }

		const idxs = [];
		queryResults.forEach((item) => {
			idxs.push(item.id);
		});

		console.log(idxs);

		return setSearchResults(queryResults);
	}, [nameInputState, tagInputState]);

	return (
		<section className='student-profile-container'>
			<form className='student-profile-filter-controls'>
				<TextInput
					id='nameInput'
					cname='student-profile-text-input'
					handleStateChange={handleInputState}
					placeholder='Search by name'
					state={nameInputState}
					type='text'
				/>
				<TextInput
					id='tagInput'
					cname='student-profile-text-input'
					handleStateChange={handleInputState}
					placeholder='Search by tag'
					state={tagInputState}
					type='text'
				/>
			</form>
			{nameInputState.length > 0 || tagInputState.length > 0
				? searchResults.map((item) => {
						return (
							<ProfileCard
								key={`student${item.id}`}
								student={item}
							/>
						);
				  })
				: studentsArr.map((item) => {
						return (
							<ProfileCard
								key={`student${item.id}`}
								student={item}
							/>
						);
				  })}
		</section>
	);
};
