const express = require('express');
const app = express();
const port = 3000;
const db = require('./queries');
app.use(express.json());

app.get('/', (request, response) => {
	response.send({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/qa/:product_id/questions', db.getQuestionsById);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
