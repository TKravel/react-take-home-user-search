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
		let queryResults = [];

		queryResults = studentsArr.filter((student) => {
			return setFilterConditions(nameInputState, tagInputState, student);
		});

		return setSearchResults(queryResults);
	}, [nameInputState, tagInputState, studentsArr]);

	return (
		<section className='student-search-component'>
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
			<div className='student-display-container'>
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
			</div>
		</section>
	);
};
