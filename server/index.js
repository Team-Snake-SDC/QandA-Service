const express = require('express');
const app = express();
const port = 3000;
const db = require('./queries');
const fs = require('fs');
app.use(express.json());

const loaderKey = fs.readFileSync('server/loader.txt');

app.get('/', (request, response) => {
	response.send({ info: 'Node.js, Express, and Postgres API' });
});

app.get('loaderio-9df557dca23a80a39e8a1a83ba586910', (req, res) =>
	res.send(loaderKey)
);

app.get('/qa/questions/:product_id', db.getQuestionsById);

app.get('/qa/questions/:question_id/answers', db.getAnswers);

app.post('/qa/questions', db.addQuestion);

app.post('/qa/questions/:question_id/answers', db.addAnswer);

app.put('/qa/questions/:question_id/helpful', db.updateHelpfulQuestion);

app.put('/qa/questions/:question_id/report', db.updateReportedQuestion);

app.put('/qa/answers/:answer_id/helpful', db.updateHelpfulAnswer);

app.put('/qa/answers/:answer_id/report', db.updateReportedAnswer);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
