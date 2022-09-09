var mysql = require('mysql2');

var connection = mysql.createConnection
({
  host: "192.168.94.34",
  port: "3308",
  user: "root",
  password: "helloworld",
  database: "library"
});

function connect() {
	connection.connect(function(err) {
		if (err) {
			console.log(err);
			throw err;

		} else {
			console.log("Connected!");
		}});
}


// function tryConnect()
// {
//  con.query("SELECT * from book_list", function (err, result) 
//  {
//     if (err) throw err;
//     console.log("Request OK, connection OK");
//  });
// }

function getBooks()
{
	request = "SELECT * FROM Book_list";
   
	return connection.query("SELECT * from book_list", function (err, result, fields) 
	{
		if (err) throw err;
		console.log("Request OK, connection OK");
		return result;
	});
}

function addBook(book) 
{
   request = `INSERT INTO book_list (Book_name,Author,Book_type,Publish_date,Quantity) VALUES ('${book.book_name}', '${book.author}', '${book.book_type}', '${book.publish_date}', '${book.quantity}')`;
    connection.query(request, function (err, result) 
	{
		if (err) throw err;
		console.log("Request done, the book have been added successfully.");
	});
}


// function updateBook(int BookId, book)
// {
// 	request = "UPDATE book_list SET Book_name = bookname and Author = author and Book_type = booktype and Publish_date = publishDate and Quantity = quantity WHERE Id = BookId"
//     connection.query(request, function (err, result) 
// 	{
// 		if (err) throw err;
// 		console.log("Request done, the book have been successfully updated.");
// 	});
// }

//Definition of function deleteBook
function deleteBook()
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
var hostname = '0.0.0.0';
var port = 3000;
// Nous créons un objet de type Express.
var app = express();
//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes.
var myRouter = express.Router();

myRouter.route('/book')
.get(function(req,res){
	  connect();
      try {
        resultat = getBooks();
      } catch (err) {
        resultat = "Erreur lors de la récupération de la liste des livres.";
      }
      res.json({message : "List all books", methode : req.method, data: resultat});
})

// .post(function(req,res){
//       res.json({message : "Add book", methode : req.method});
//       connect();
//       addBook();
// })

// .put(function(req,res){
//       res.json({message : "Update book", methode : req.method});
//       connect();
// })

// .delete(function(req,res){
//     res.json({message : "Delete Book", methode : req.method});
//     connect();
//     deleteBook();
// })

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

connect();

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
})
