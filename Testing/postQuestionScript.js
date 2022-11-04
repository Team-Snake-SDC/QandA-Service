import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
	vus: 10,
	duration: '30s',
};

export default function () {
	const url = 'http://localhost:3000/qa/questions';
	const payload = JSON.stringify({
		product_id: 1,
		body: 'aaa',
		name: 'bbb',
		email: 'c@gmail.com',
	});

	const params = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	http.post(url, payload, params);
}
