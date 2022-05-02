import { ProfileCard } from './ProfileCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextInput } from '../TextInput';
import { setFilterConditions } from '../../utils/queryHelpers';

// main container to display cards and filter inputs
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

	// listen for filter input / update student list
	useEffect(() => {
		let queryResults = [];

		queryResults = studentsArr.filter((student) => {
			return setFilterConditions(nameInputState, tagInputState, student);
		});

		return setSearchResults(queryResults);
	}, [nameInputState, tagInputState, studentsArr]);

	// conditionally render students depending on filters
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
			<ul
				className='student-display-container'
				data-testid='student-list'
			>
				{nameInputState.length > 0 || tagInputState.length > 0
					? searchResults.map((item) => {
							return (
								<li
									key={`student${item.id}`}
									className='student-display-container-item'
									data-testid='student-list-item'
								>
									<ProfileCard student={item} />
								</li>
							);
					  })
					: studentsArr !== undefined
					? studentsArr.map((item) => {
							return (
								<li
									key={`student${item.id}`}
									className='student-display-container-item'
									data-testid='student-list-item'
								>
									<ProfileCard student={item} />
								</li>
							);
					  })
					: null}
			</ul>
		</section>
	);
};
