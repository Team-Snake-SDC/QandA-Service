const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'parkersturtevant',
	host: 'localhost',
	database: 'Questions_and_Answers',
	password: '',
	port: 5432,
});

const getQuestionsById = (req, res) => {
	const id = req.params.product_id || req.body.id;
	pool
		.query('SELECT * from questions where product_id = $1', [id])
		.then((data) => {
			res.send(data.rows);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

module.exports = {
	getQuestionsById,
};
