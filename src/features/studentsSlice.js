import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudentData = createAsyncThunk(
	'studentsData/fetchStudentData',
	async () => {
		const res = fetch('https://api.hatchways.io/assessment/students').then(
			(response) => response.json()
		);
		return res;
	}
);

export const selectTagByStudentID = (state, id) => {
	const selectedStudent = state.studentData.students.filter((student) => {
		return student.id === id;
	});
	return selectedStudent[0].tags;
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
					if (student.tags === undefined) {
						return (state.studentData.students[index].tags = [
							action.payload.tag,
						]);
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
