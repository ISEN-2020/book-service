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

//object used to store and output data to the UI.
function Books(id,book_name,author,book_type,publishDate,quantity){
  this.id = id;
  this.bookname = book_name;
  this.author = author;
  this.booktype = book_type;
  this.publishDate = publishDate;
  this.quantity = quantity;
}

function tryConnect()
{
	request = "SELECT * from book_list"
	connection.query(request, function (err, result) 
	{
		if(err)
			throw err;
		console.log("Request OK, connection OK");
	});
}

//Retrieve a book by searching for his ID
function getBook(id) 
{
	request = "SELECT * FROM Book_list where Id = id";
	connection.query(request, function (err, result, fields) 
	{
		if(err) 
			throw err;
		console.log(result);
	});
}

//Allows us to check if a book is available or not
function isAvailable(id)
{
	request = "SELECT quantity FROM Book_list where Id = id";
	connection.query(request, function (err, result, fields) 
	{
		if(err)
			throw err;
		console.log(result);
		
		if(result[0].quantity > 0)
			console.log("The book is available");
	});
}

function getBooks()
{
	request = "SELECT * FROM Book_list";
	connection.query(request, function (err, result, fields) 
	{
		if(err)
			throw err;
		console.log(result);
	});
}
