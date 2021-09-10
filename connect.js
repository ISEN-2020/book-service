var mysql = require('mysql');

var connection = mysql.createConnection
({
  host: "localhost",
  user: "root",
  password: "helloworld",
  database: "library"
});

connection.connect(function(err) 
{
  if (err) throw err;
  console.log("Connected!");
});

function tryConnect()
{
	request = "SELECT * from book_list"
	connection.query(request, function (err, result) 
	{
		if (err) throw err;
		console.log("Request OK, connection OK");
	});
}

function getBooks()
 {
	request = "SELECT * FROM Book_list";
   
	connection.query(request, function (err, result, fields) 
	{
		if (err) throw err;
		console.log(result);
	});
}

function addBook(Books) 
{
   request = INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES (' + book_name + ', ' + author + ', ' + book_type + ', ' + publish_date + ', ' + quantity + ');
    connection.query(request, function (err, result) 
	{
		if (err) throw err;
		console.log("Request done, the book have been added successfully.");
	});
}

// FIRST TRY THE CONNECTION
tryConnect();

// REQUEST THE BOOK_LIST FROM DATABASE
getBooks();

// THEN TRY TO ADD A BOOK IN THE DATABASE
addBook("Javascript for nerds", "Nobody", "Technical", 2021-09-10, 5);
