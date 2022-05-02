import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { buildStore } from '../../../mocks/buildStore';
import { ProfileCard } from '../ProfileCard';
import userEvent from '@testing-library/user-event';

const mockStudent = {
	city: 'Fushë-Muhurr',
	company: 'Yadel',
	email: 'iorton0@imdb.com',
	firstName: 'Ingaberg',
	grades: ['78', '100', '92', '86', '89', '88', '91', '87'],
	id: '1',
	lastName: 'Orton',
	pic: 'https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg',
	skill: 'Oracle',
};

describe('Should render correctly', () => {
	const store = buildStore();
	it('should contain proper elements', () => {
		render(
			<Provider store={store}>
				<ProfileCard student={mockStudent} />
			</Provider>
		);

		// check for avatar, name, details, tag input, expand button
		const profileImg = screen.getByRole('img', { alt: /user avatar/i });
		const studentName = screen.getByRole('heading', { level: 1 });
		const detailsList = screen.getAllByRole('list');
		const tagInput = screen.getByPlaceholderText(/add a tag/i);
		const expandButton = screen.getByRole('button', {
			label: /view test scores/i,
		});

		expect(profileImg).toBeInTheDocument();
		expect(studentName).toBeInTheDocument();
		expect(detailsList.length).toEqual(1);
		expect(tagInput).toBeInTheDocument();
		expect(expandButton).toBeInTheDocument();
	});
});

describe('it should show test scores', () => {
	const store = buildStore();
	it('should expand and collapse to show scores', () => {
		render(
			<Provider store={store}>
				<ProfileCard student={mockStudent} />
			</Provider>
		);

		const expandButton = screen.getByRole('button', {
			label: /view test scores/i,
		});
		let testScore = screen.queryAllByRole('list');

		// should only be one list on card (details)
		expect(testScore.length).toEqual(1);

		// click expand
		userEvent.click(expandButton);

		// two lists should be on card (details and test scores)
		testScore = screen.queryAllByRole('list');
		expect(testScore.length).toEqual(2);

		// collapse
		userEvent.click(expandButton);

		// test score list is hidden
		testScore = screen.queryAllByRole('list');
		expect(testScore.length).toEqual(1);
	});
});
