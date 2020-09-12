CREATE DATABASE library;
\c library;

CREATE TABLE IF NOT EXISTS public.book_list
(
    "ID" smallint NOT NULL DEFAULT nextval('public.book_list'),
    "Name" character varying(120) NOT NULL,
    "Author" character varying(120) NOT NULL,
    "Type" character varying(120) NOT NULL,
    "Publish_date" date NOT NULL,
    "Available" boolean,
    "Quantity" smallint,
    CONSTRAINT "Book_ID" PRIMARY KEY ("ID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.book_list
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.available_books
(
    "ID" smallint NOT NULL DEFAULT nextval('public.available_books'),
	"Available_BOOK_ID" smallint NOT NULL,
	"Book_name" character varying(120) NOT NULL,
	CONSTRAINT "available_books_ID" PRIMARY KEY ("ID")
);
ALTER TABLE public.available_books
    ADD CONSTRAINT book_ID_FK
    FOREIGN KEY ("Available_BOOK_ID")
    REFERENCES public.book_list("ID");
INSERT INTO book_list VALUES ('0','The Handmaids Tale','Margaret Atwood','Anticipation novel','1985-01-01','t',13);
INSERT INTO book_list VALUES ('1','Les Furtifs','Alain Demasio','Novel','2019-01-01','t',1);
INSERT INTO book_list VALUES ('2','Sonnenschein','Dasa Drndic','Documentary','2013-01-01','f',0);
INSERT INTO book_list VALUES ('3','It cant happen here','Sinclair Lewis','Anticipation novel','1935-01-21','t',15);
INSERT INTO book_list VALUES ('4','Le regard de la source','Mathieu Riboulet','True story','2003-01-01','t',27);
INSERT INTO book_list VALUES ('5','Millenium 1','Stieg Larsson','Novel','2005-08-01','t',29);
INSERT INTO book_list VALUES ('6','Die Drei Groschenoper','Bertolt Brecht','Theatre','1928-08-31','t',29);
INSERT INTO book_list VALUES ('7','Extreme Ownership','Jocko Willink','Biography','2015-10-20','t',19);
INSERT INTO book_list VALUES ('8','The man In the high castle','Phillip K Dick','Anticipation novel','1962-10-01','t',4);
INSERT INTO book_list VALUES ('9','Trois Chevaux','Erri DeLuca','Novel','2018-03-18','t',10);
INSERT INTO book_list VALUES ('10','Il etait une fois linux','Linus Torvalds','Tech','2001-05-23','f',0);

