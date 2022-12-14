COPY questions(id, product_id, body, date, asker_name, asker_email, reported, helpful)
FROM '/Users/parkersturtevant/Documents/HR/SDC/QandA-Service/questions.csv'
DELIMITER ','
CVS HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/parkersturtevant/Documents/HR/SDC/QandA-Service/data/answers.csv' DELIMITER ',' CSV HEADER;

COPY "Answer Image"(id, answer_id, url) FROM '/Users/parkersturtevant/Documents/HR/SDC/QandA-Service/data/answers_photos.csv' DELIMITER ',' CSV HEADER;