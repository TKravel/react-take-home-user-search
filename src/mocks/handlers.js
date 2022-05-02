import { rest } from 'msw';
import { mockData } from './mockData';

export const handlers = [
	rest.get(
		'https://api.hatchways.io/assessment/students',
		(req, res, ctx) => {
			// return mockData for app load and status 200
			console.log(mockData);
			return res(ctx.json(mockData));
		}
	),
];
