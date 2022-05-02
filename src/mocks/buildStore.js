import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/studentsSlice';
import { students } from './mockData';

// create mock store for testing
export const buildStore = () => {
	const store = configureStore({
		reducer: studentReducer,
		preloadedState: {
			studentData: { students },
			status: 'idle',
			error: null,
		},
	});
	return store;
};
