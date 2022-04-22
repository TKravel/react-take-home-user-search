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

const initialState = {
	studentData: [],
	status: 'idle',
	error: null,
};

export const studentsSlice = createSlice({
	name: 'studentsData',
	initialState,
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchStudentData.pending, (state, action) => {
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

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
	studentsSlice.actions;

export default studentsSlice.reducer;
