const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'parkersturtevant',
	host: 'localhost',
	database: 'Questions_and_Answers',
	password: '',
	port: 5432,
});

const getQuestionsById = (req, res) => {
	let id = req.params.product_id || req.body.product_id;
	let count = req.query.count || 5;
	let page = req.query.page || 1;
	pool
		.query(
			`SELECT * from questions where product_id = $1 order by question_id limit ${count} offset ${
				page * count - count
			}`,
			[id]
		)
		.then((data) => {
			const formattedData = {
				product_id: id,
				results: data.rows,
			};
			res.status(200).send(formattedData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const getAnswers = (req, res) => {
	let id = req.params.question_id || req.body.question_id;
	let count = req.query.count || 5;
	let page = req.query.page || 1;
	pool
		.query('SELECT * FROM answers WHERE question_id = $1', [id])
		.then((data) => {
			const formattedData = {
				question: id,
				page: page,
				count: count,
				results: data.rows,
			};
			res.status(200).send(formattedData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const addQuestion = (req, res) => {
	const question = req.body;
	pool
		.query(
			'INSERT INTO questions (product_id, body, date, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)',
			[
				question.product_id,
				question.body,
				new Date().getTime(),
				question.name,
				question.email,
			]
		)
		.then((data) => {
			res.status(201).send('posted');
		})
		.then((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const addAnswer = (req, res) => {
	const question_id = req.params.question_id;
	const answer = req.body;
	pool
		.query(
			'INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5)',
			[
				question_id,
				answer.body,
				new Date().getTime(),
				answer.name,
				answer.email,
			]
		)
		.then((data) => {
			res.status(201).send('posted');
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};
module.exports = {
	getQuestionsById,
	getAnswers,
	addQuestion,
	addAnswer,
};
