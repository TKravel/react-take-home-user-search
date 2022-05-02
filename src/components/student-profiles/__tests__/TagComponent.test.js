import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { buildStore } from '../../../mocks/buildStore';
import { TagComponent } from '../TagComponent';
import userEvent from '@testing-library/user-event';

const mockStudentID = '1';

describe('tag component should work', () => {
	const store = buildStore();
	it('should be able to add tags', () => {
		render(
			<Provider store={store}>
				<TagComponent studentID={mockStudentID} />
			</Provider>
		);

		let tagList = screen.queryAllByRole('list');
		const tagInput = screen.getByPlaceholderText(/add a tag/i);

		// list should be empty
		expect(tagList.length).toEqual(0);

		// add tag
		userEvent.type(tagInput, 'test');
		userEvent.keyboard('{Enter}');

		// new tag should be saved and displayed
		tagList = screen.queryAllByRole('list');
		const listItem = screen.queryAllByText('test', { exact: false });

		expect(tagList.length).toEqual(1);
		expect(listItem.length).toEqual(1);
	});
});
