// import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { buildStore } from '../../../mocks/buildStore';
import { StudentProfiles } from '../StudentProfiles';
import userEvent from '@testing-library/user-event';

describe('Should render properly', () => {
	const store = buildStore();

	it('Should have two text inputs', () => {
		render(
			<Provider store={store}>
				<StudentProfiles />
			</Provider>
		);
		const nameInput = screen.getByPlaceholderText(/search by name/i);
		const tagInput = screen.getByPlaceholderText(/search by name/i);

		expect(nameInput).toBeInTheDocument();
		expect(tagInput).toBeInTheDocument();
	});

	it('Should display a list of 25 items', () => {
		render(
			<Provider store={store}>
				<StudentProfiles />
			</Provider>
		);
		const list = screen.getByTestId('student-list');
		const listItems = screen.queryAllByTestId('student-list-item');

		expect(list).toBeInTheDocument();
		expect(listItems.length).toEqual(25);
	});
});

describe('Search should show filtered results', () => {
	const store = buildStore();
	// const user = userEvent.setup();
	it('Filters by name and resets when clear', async () => {
		render(
			<Provider store={store}>
				<StudentProfiles />
			</Provider>
		);

		const nameInput = screen.getByPlaceholderText(/search by name/i);

		// select name inout
		userEvent.click(nameInput);
		// type 'in'
		userEvent.type(nameInput, 'in');

		// get list items after filter
		let listItems = screen.queryAllByTestId('student-list-item');

		// expect only 4 students returned
		expect(listItems.length).toEqual(4);

		// clear input
		userEvent.clear(nameInput);

		listItems = screen.queryAllByTestId('student-list-item');

		// expect all 25 students
		expect(listItems.length).toEqual(25);
	});

	it('should filter by tag', () => {
		render(
			<Provider store={store}>
				<StudentProfiles />
			</Provider>
		);
		const tagSearchInput = screen.getByPlaceholderText(/search by tag/i);
		const tagAddInput = screen.getAllByPlaceholderText(/add a tag/i);

		// add a tag "test" to first card
		userEvent.type(tagAddInput[0], 'test');
		userEvent.keyboard('{Enter}');

		// enter test in tag search bar
		userEvent.type(tagSearchInput, 'test');

		const tagSearchResults = screen.getAllByTestId('student-list-item');
		// expect only one student returned
		expect(tagSearchResults.length).toEqual(1);
	});
});
