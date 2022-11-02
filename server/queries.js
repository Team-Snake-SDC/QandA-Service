const Pool = require('pg').Pool
const pool = new Pool({
  user: 'parkersturtevant',
  host: 'localhost',
  database: 'Questions_and_Answers',
  password: '',
  port: 5432,
})


const getQuestionsById = (req, res) => {
  query = {
    text: `SELECT * FROM Question WHERE product_id = ${req.body.product_id} order by id limit ${req.body.count} offset ${(req.body.page * req.body.count) - req.body.count}`
  }
  pool.query(query.text, (error, data) => {
    if (error) {
      throw error
    } else {
      res.status(200).json(data.rows)
    }
  })
}


module.exports = {
  getQuestionsById
}