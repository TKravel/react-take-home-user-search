import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { buildStore } from './mocks/buildStore';
import App from './App';

describe('app should render ', () => {
	const store = buildStore();

	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	it('should render app component', async () => {
		const app = screen.getByTestId(/app-rendered/i);

		await waitFor(() => expect(app).toBeInTheDocument());
	});
});
