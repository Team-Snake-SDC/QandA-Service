const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'Questions_and_Answers',
  password: '',
  port: 5432,
})

const getQuestionsById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE product_id = $1 order by id LIMIT 10', [id], (error, data) => {
    if (error) {
      throw error
    }
    response.status(200).json(data.rows)
  })
}