CREATE DATABASE IF NOT EXISTS library;

CREATE TABLE IF NOT EXISTS book_list
(
    Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Book_name varchar(255) NOT NULL,
    Author varchar(255) NOT NULL,
    Book_type varchar(255) NOT NULL,
    Publish_date date NOT NULL,
    Quantity smallint
);

INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('The Handmaids Tale', 'Margaret Atwood', 'Anticipation novel', '1985-01-01', '13');
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Les Furtifs','Alain Demasio','Novel','2019-01-01',1);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Sonnenschein','Dasa Drndic','Documentary','2013-01-01',0);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('It cant happen here','Sinclair Lewis','Anticipation novel','1935-01-21',15);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Le regard de la source','Mathieu Riboulet','True story','2003-01-01',27);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Millenium 1','Stieg Larsson','Novel','2005-08-01',29);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Die Drei Groschenoper','Bertolt Brecht','Theatre','1928-08-31',29);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Extreme Ownership','Jocko Willink','Biography','2015-10-20',19);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('The man In the high castle','Phillip K Dick','Anticipation novel','1962-10-01',4);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Trois Chevaux','Erri DeLuca','Novel','2018-03-18',10);
INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('Il etait une fois linux','Linus Torvalds','Tech','2001-05-23',0);
