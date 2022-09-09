CREATE DATABASE IF NOT EXISTS library;

CREATE TABLE IF NOT EXISTS book_list
(
    Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    book_type varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    Publish_date date NOT NULL,
    quantity smallint
);

INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('The Handmaids Tale', 'Margaret Atwood', 'Anticipation novel','Le ciel est bleu', '1985-01-01', '13');
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Les Furtifs','Alain Demasio','Novel','Le ciel est bleu','2019-01-01',1);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Sonnenschein','Dasa Drndic','Documentary','Le ciel est bleu','2013-01-01',0);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('It cant happen here','Sinclair Lewis','Anticipation novel','Le ciel est bleu','1935-01-21',15);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Le regard de la source','Mathieu Riboulet','True story','Le ciel est bleu','2003-01-01',27);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Millenium 1','Stieg Larsson','Novel','Le ciel est bleu','2005-08-01',29);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Die Drei Groschenoper','Bertolt Brecht','Theatre','Le ciel est bleu','1928-08-31',29);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Extreme Ownership','Jocko Willink','Biography','Le ciel est bleu','2015-10-20',19);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('The man In the high castle','Phillip K Dick','Anticipation novel','Le ciel est bleu','1962-10-01',4);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Trois Chevaux','Erri DeLuca','Novel','Le ciel est bleu','2018-03-18',10);
INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('Il etait une fois linux','Linus Torvalds','Tech','Le ciel est bleu','2001-05-23',0);
