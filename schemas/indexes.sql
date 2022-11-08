CREATE INDEX product_index ON questions(product_id);
CREATE INDEX question_index ON answers(question_id);
CREATE INDEX answer_index ON answers(id);
CREATE INDEX answer_photo_index ON answer_photos(answer_id);