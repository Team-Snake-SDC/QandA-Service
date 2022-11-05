import { check, group, sleep } from 'k6';
import http from 'k6/http';

export const options = {
	vus: 20, // Virtual Users
	duration: '30s',
};

const questions = `http://localhost:3000/qa/questions/${
	Math.floor(Math.random() * 1000000) + 1
}`;
const postQuestions = 'http://localhost:3000/qa/questions';
const answers = `http://localhost:3000/qa/questions/${
	Math.floor(Math.random() * 1000000) + 1
}/answers`;
const helpful = `http://localhost:3000/qa/questions/${
	Math.floor(Math.random() * 1000000) + 1
}/helpful`;
const report = `http://localhost:3000/qa/questions/${
	Math.floor(Math.random() * 1000000) + 1
}/report`;

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

export default function test() {
	group('getQuestionsById', () => {
		const questionsResponse = http.get(questions);
		check(questionsResponse, {
			'transaction time 10ms': (r) => r.timings.duration < 10,
			'transaction time 50ms': (r) => r.timings.duration < 50,
			'transaction time 200ms': (r) => r.timings.duration < 200,
			'transaction time 500ms': (r) => r.timings.duration < 500,
			'transaction time 1000ms': (r) => r.timings.duration < 1000,
			'transaction time 2000ms': (r) => r.timings.duration < 2000,
			'transaction time 5000ms': (r) => r.timings.duration < 5000,
			'transaction time 10s': (r) => r.timings.duration < 10000,
			'transaction time 20s': (r) => r.timings.duration < 20000,
		});
	});
	// group('postQuestions', () => {
	// 	const postQuestionsResponse = http.post(postQuestions, payload, params);
	// 	check(postQuestionsResponse, {
	// 		'transaction time 10ms': (r) => r.timings.duration < 10,
	// 		'transaction time 50ms': (r) => r.timings.duration < 50,
	// 		'transaction time 200ms': (r) => r.timings.duration < 200,
	// 		'transaction time 500ms': (r) => r.timings.duration < 500,
	// 		'transaction time 1000ms': (r) => r.timings.duration < 1000,
	// 		'transaction time 2000ms': (r) => r.timings.duration < 2000,
	// 		'transaction time 5000ms': (r) => r.timings.duration < 5000,
	// 		'transaction time 10s': (r) => r.timings.duration < 10000,
	// 		'transaction time 20s': (r) => r.timings.duration < 20000,
	// 	});
	// });
	// group('getAnswers', () => {
	// 	const answerResponse = http.get(answers);
	// 	check(answerResponse, {
	// 		'transaction time 10ms': (r) => r.timings.duration < 10,
	// 		'transaction time 50ms': (r) => r.timings.duration < 50,
	// 		'transaction time 200ms': (r) => r.timings.duration < 200,
	// 		'transaction time 500ms': (r) => r.timings.duration < 500,
	// 		'transaction time 1000ms': (r) => r.timings.duration < 1000,
	// 		'transaction time 2000ms': (r) => r.timings.duration < 2000,
	// 		'transaction time 5000ms': (r) => r.timings.duration < 5000,
	// 		'transaction time 10s': (r) => r.timings.duration < 10000,
	// 		'transaction time 20s': (r) => r.timings.duration < 20000,
	// 	});
	// });
	// group('helpful', () => {
	// 	const helpfulResponse = http.put(helpful);
	// 	check(helpfulResponse, {
	// 		'transaction time 10ms': (r) => r.timings.duration < 10,
	// 		'transaction time 50ms': (r) => r.timings.duration < 50,
	// 		'transaction time 200ms': (r) => r.timings.duration < 200,
	// 		'transaction time 500ms': (r) => r.timings.duration < 500,
	// 		'transaction time 1000ms': (r) => r.timings.duration < 1000,
	// 		'transaction time 2000ms': (r) => r.timings.duration < 2000,
	// 		'transaction time 5000ms': (r) => r.timings.duration < 5000,
	// 		'transaction time 10s': (r) => r.timings.duration < 10000,
	// 		'transaction time 20s': (r) => r.timings.duration < 20000,
	// 	});
	// });
	// group('report', () => {
	// 	const reportResponse = http.put(report);
	// 	check(reportResponse, {
	// 		'transaction time 10ms': (r) => r.timings.duration < 10,
	// 		'transaction time 50ms': (r) => r.timings.duration < 50,
	// 		'transaction time 200ms': (r) => r.timings.duration < 200,
	// 		'transaction time 500ms': (r) => r.timings.duration < 500,
	// 		'transaction time 1000ms': (r) => r.timings.duration < 1000,
	// 		'transaction time 2000ms': (r) => r.timings.duration < 2000,
	// 		'transaction time 5000ms': (r) => r.timings.duration < 5000,
	// 		'transaction time 10s': (r) => r.timings.duration < 10000,
	// 		'transaction time 20s': (r) => r.timings.duration < 20000,
	// 	});
	// });
}
