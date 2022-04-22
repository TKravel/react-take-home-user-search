import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/studentsSlice';

const store = configureStore({
	reducer: studentsReducer,
});

export default store;
