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
			`SELECT json_build_object
			(
					'product_id', ${id},
					'results',
				(SELECT json_agg
					(jsonb_build_object
						(
						'question_id', id,
						'body', body,
						'date', TO_CHAR(TO_TIMESTAMP(date_written/1000), 'YYYY-MM-DD T HH24:MI:SS'),
						'asker_name', asker_name,
						'reported', reported,
						'helpful', helpful,
						'answers',
							(SELECT json_object_agg
								(
								id,
									(SELECT json_build_object
										(
											'id', id,
											'body', body,
											'date', TO_CHAR(TO_TIMESTAMP(date_written/1000), 'YYYY-MM-DD T HH24:MI:SS'),
											'answerer_name', answerer_name,
											'reported', reported,
											'helpful', helpful,
											'photos',
												(SELECT json_agg(url) from answer_photos where answer_photos.answer_id = answers.id)
										)
									)
								) from answers where answers.question_id = questions.id)
						)
					) from questions where product_id = ${id} AND reported = false limit ${count} offset ${
				page * count - count
			}
				)
			)`
		)
		.then((data) => {
			res.status(200).send(data.rows[0].json_build_object);
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
		.query(
			`SELECT json_build_object
			(
				'question', ${id},
				'count', ${count},
				'page', ${page},
				'results',
				(SELECT json_agg
						(
							json_build_object
							(
								'answer_id', id,
								'body', body,
								'date', TO_CHAR(TO_TIMESTAMP(date_written/1000), 'YYYY-MM-DD T HH24:MI:SS'),
								'answerer_name', answerer_name,
								'helpfulness', helpful,
								'photos',
									(
										SELECT json_agg(photos) FROM
										(
											SELECT id, url FROM answer_photos where answer_photos.answer_id = answers.id
										) photos
									)
							)
						) FROM answers where answers.question_id = ${id} AND reported = false limit ${count} offset ${
				page * count - count
			}
				)

			)`
		)
		.then((data) => {
			res.status(200).send(data.rows[0].json_build_object);
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
			'INSERT INTO questions (product_id, body, date_written, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)',
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
			'INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5) RETURNING ID',
			[
				question_id,
				answer.body,
				new Date().getTime(),
				answer.name,
				answer.email,
			]
		)
		.then((data) => {
			if (answer.photos.length === 0) {
				res.status(201).send('posted');
			} else {
				let newId = data.rows[0].id;
				let photoQueries = [];
				answer.photos.forEach((photo) => {
					photoQueries.push(
						pool.query(
							'INSERT INTO answer_photos(answer_id, url) VALUES ($1, $2)',
							[newId, photo]
						)
					);
				});
				Promise.all(photoQueries)
					.then((data) => {
						res.status(201).send('posted photos');
					})
					.catch((err) => {
						console.log(err);
						res.status(500).send(err);
					});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const updateHelpfulQuestion = (req, res) => {
	let id = req.params.question_id;
	pool
		.query('UPDATE questions SET helpful = helpful + 1 WHERE id = $1', [id])
		.then((data) => {
			res.send();
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const updateReportedQuestion = (req, res) => {
	let id = req.params.question_id;
	pool
		.query('UPDATE questions SET reported = true WHERE id = $1', [id])
		.then((data) => {
			res.send();
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const updateHelpfulAnswer = (req, res) => {
	let id = req.params.answer_id;
	pool
		.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [id])
		.then((data) => {
			res.send();
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

const updateReportedAnswer = (req, res) => {
	let id = req.params.answer_id;
	pool
		.query('UPDATE answers SET reported = true WHERE id = $1', [id])
		.then((data) => {
			res.send();
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
	updateHelpfulQuestion,
	updateReportedQuestion,
	updateHelpfulAnswer,
	updateReportedAnswer,
};
