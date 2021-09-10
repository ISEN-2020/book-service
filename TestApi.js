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
 con.query("SELECT * from book_list", function (err, result) 
 {
    if (err) throw err;
    console.log("Request OK, connection OK");
 });
}

function getBooks()
{
	request = "SELECT * FROM Book_list";
   
	connection.query("SELECT * from book_list", function (err, result, fields) 
	{
		if (err) throw err;
		console.log("Request OK, connection OK");
		return result;
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


function updateBook(int BookId, Books)
{
	request = "UPDATE book_list SET Book_name = bookname and Author = author and Book_type = booktype and Publish_date = publishDate and Quantity = quantity WHERE Id = BookId"
    connection.query(request, function (err, result) 
	{
		if (err) throw err;
		console.log("Request done, the book have been successfully updated.");
	});
}

//Definition of function deleteBook
function deleteBook(int id)
{
	request = "DELETE FROM book_list WHERE ID = id";
	connection.query(request, function (err, result)
	{
		if (err) throw err;
		console.log("Request done, the book have been successfully deleted.");
	});
}

var express = require('express');
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 3000;
// Nous créons un objet de type Express.
var app = express();
//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes.
var myRouter = express.Router();

myRouter.route('/book')
.get(function(req,res){
      res.json({message : "List all books", methode : req.method});
      connect();
      getBooks();
})

.post(function(req,res){
      res.json({message : "Add book", methode : req.method});
      connect();
      addBook();
})

.put(function(req,res){
      res.json({message : "Update book", methode : req.method});
      connect();
})

.delete(function(req,res){
    res.json({message : "Delete Book", methode : req.method});
    connect();
    deleteBook();
})

.update(function(req,res){
    res.json({message : "Update book", methode : req.nethod});
    updateBook();
})

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
})
