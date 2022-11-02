-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table QandA
--
-- ---

DROP TABLE IF EXISTS QandA;

CREATE TABLE QandA (
  product_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

-- ---
-- Table Questions
--
-- ---

DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
  question_id INTEGER NOT NULL DEFAULT NULL,
  question_body VARCHAR(255) NULL DEFAULT NULL,
  question_date VARCHAR(255) NULL DEFAULT NULL,
  asker_name VARCHAR(255) NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (question_id)
);

-- ---
-- Table Answers
--
-- ---

DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  question_id INTEGER NULL DEFAULT NULL
  body VARCHAR(255) NULL DEFAULT NULL,
  date_written BIGINT NULL DEFAULT NULL,
  answerer_name VARCHAR(255) NULL DEFAULT NULL,
  answer_email VARCHAR(255) NULL DEFAULT NULL,
  reported BOOLEAN NULL DEFAULT false,
  helpful INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (question_id)
);

-- ---
-- Table Answer Photos
--
-- ---

DROP TABLE IF EXISTS Answer_Photos;

CREATE TABLE Answer_Photos (
  id SERIAL NOT NULL,
  answer_id  INTEGER NULL DEFAULT NULL,
  url VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Questions ADD FOREIGN KEY (product_id) REFERENCES QandA (product_id);
ALTER TABLE Answers ADD FOREIGN KEY (question_id_questions) REFERENCES Questions (question_id);
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
-- ---

-- INSERT INTO QandA (product_id) VALUES
-- ();
-- INSERT INTO Questions (question_id,question_body,question_date,asker_name,question_helpfulness,reported,product_id) VALUES
-- (,,,,,,);
-- INSERT INTO Answers (answer_id,answer_body,answer_date,answerer_name,answer_helpfulness,question_id_questions) VALUES
-- (,,,,,);
-- INSERT INTO Answer Photos (id,url,answer_id_answers) VALUES
-- (,,);