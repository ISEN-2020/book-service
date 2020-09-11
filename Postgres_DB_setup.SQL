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