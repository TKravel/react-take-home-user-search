import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTag, selectTagByStudentID } from '../../features/studentsSlice';
import { TextInput } from '../TextInput';

// Create and display user tags
export const TagComponent = ({ studentID }) => {
	const dispatch = useDispatch();
	const selectTagsByID = useMemo(() => selectTagByStudentID, []);
	const tags = useSelector((state) => selectTagsByID(state, studentID));
	const [tagInput, setTagInput] = useState('');

	const handleTagInputState = (e) => {
		setTagInput(e.target.value);
	};

	// Listen for 'enter' key down / save tag in redux store
	const listenToKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === 'NumPadEnter') {
			e.preventDefault();
			if (tagInput.length > 0) {
				dispatch(addNewTag({ id: studentID, tag: tagInput }));
				setTagInput('');
			}
		}
	};

	// Conditionally render tags if they exist on student object
	// Form to create tags
	return (
		<>
			{tags !== undefined && (
				<ul className='tag-list'>
					{tags.map((tag, index) => {
						return (
							<li className='tag-list-item' key={index}>
								{tag}
							</li>
						);
					})}
				</ul>
			)}
			<form onKeyDown={listenToKeyDown}>
				<TextInput
					id='tag-input'
					cname='student-tag-input'
					handleStateChange={handleTagInputState}
					state={tagInput}
					placeholder='Add a tag'
					type='text'
				/>
			</form>
		</>
	);
};
