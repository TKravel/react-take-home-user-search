import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// fetch student data from api / add to store
export const fetchStudentData = createAsyncThunk(
	'studentsData/fetchStudentData',
	async () => {
		try {
			const res = await fetch(
				'https://api.hatchways.io/assessment/students'
			);
			const students = res.json();
			return students;
		} catch (err) {
			console.log(err);
		}
	}
);

// return tags for student by student ID
export const selectTagByStudentID = (state, id) => {
	const selectedStudent = state.studentData.students.find((student) => {
		return student.id === id;
	});
	return selectedStudent.tags;
};

const initialState = {
	studentData: [],
	status: 'idle',
	error: null,
};

export const studentsSlice = createSlice({
	name: 'studentsData',
	initialState,
	reducers: {
		addNewTag: (state, action) => {
			state.studentData.students.forEach((student, index) => {
				if (action.payload.id === student.id) {
					// if no tag property on state obj only add 1 tag
					if (student.tags === undefined) {
						return (state.studentData.students[index].tags = [
							action.payload.tag,
						]);
						// else spread prev tags and append new tag
					} else {
						return (state.studentData.students[index].tags = [
							...student.tags,
							action.payload.tag,
						]);
					}
				}
			});
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchStudentData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchStudentData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.studentData = action.payload;
			})
			.addCase(fetchStudentData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { addNewTag } = studentsSlice.actions;

export default studentsSlice.reducer;
