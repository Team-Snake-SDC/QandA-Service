-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;



-- ---
-- Table Questions
--
-- ---

DROP TABLE IF EXISTS Questions CASCADE;

CREATE TABLE Questions (
  id SERIAL NOT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  body VARCHAR(255) NULL DEFAULT NULL,
  date_written VARCHAR(255) NULL DEFAULT NULL,
  asker_name VARCHAR(255) NULL DEFAULT NULL,
  asker_email VARCHAR(255) NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT FALSE,
  helpful INTEGER NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table Answers
--
-- ---

DROP TABLE IF EXISTS Answers CASCADE;

CREATE TABLE Answers (
  id SERIAL NOT NULL,
  question_id INTEGER NULL DEFAULT NULL,
  body VARCHAR(255) NULL DEFAULT NULL,
  date_written VARCHAR(255) NULL DEFAULT NULL,
  answerer_name VARCHAR(255) NULL DEFAULT NULL,
  answer_email VARCHAR(255) NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT false,
  helpful INTEGER NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table Answer Photos
--
-- ---

DROP TABLE IF EXISTS Answer_Photos CASCADE;

CREATE TABLE Answer_Photos (
  id SERIAL NOT NULL,
  answer_id  INTEGER NULL DEFAULT NULL,
  url VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---
ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (id);
ALTER TABLE Answer_Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE QandA ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answer Photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data

COPY questions(id, product_id, body, date, asker_name, asker_email, reported, helpful)
FROM '/Users/parkersturtevant/Documents/HR/SDC/QandA-Service/questions.csv'
DELIMITER ','
CVS HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/parkersturtevant/Documents/HR/SDC/QandA-Service/data/answers.csv' DELIMITER ',' CSV HEADER;

COPY "Answer Image"(id, answer_id, url) FROM '/Users/parkersturtevant/Documents/HR/SDC/QandA-Service/data/answers_photos.csv' DELIMITER ',' CSV HEADER;
-- ---

-- INSERT INTO QandA (product_id) VALUES
-- ();
-- INSERT INTO Questions (question_id,question_body,question_date,asker_name,question_helpfulness,reported,product_id) VALUES
-- (,,,,,,);
-- INSERT INTO Answers (answer_id,answer_body,answer_date,answerer_name,answer_helpfulness,question_id_questions) VALUES
-- (,,,,,);
-- INSERT INTO Answer Photos (id,url,answer_id_answers) VALUES
-- (,,);