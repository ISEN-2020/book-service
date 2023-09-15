var mysql = require('mysql2');

const connection = mysql.createConnection
({
  host: "172.16.246.90",
  port: "3308",
  user: "root",
  password: "helloworld",
  database: "library"
});

function getBooks() {
	return new Promise((resolve, reject) => {
		connection.query(
			"SELECT name,author,book_type,description,publish_date,quantity FROM book_list",
			(err, result) => {
				return err ? reject(err) : resolve(result);
			}
		);
	});
}

function addBook(book){
	return new Promise((resolve, reject) => {
		connection.query(
			`INSERT INTO book_list (name,author,book_type,description,Publish_date,quantity) VALUES ('${book.name}', '${book.author}', '${book.book_type}','${book.description}', '${book.publishDate}', '${book.quantity}'`,
			(err,result) => {
				return err ? reject(err) : resolve(result);
			}
		)
	})
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

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes.
var myRouter = express.Router();

myRouter.route('/getbooks')
.get(function(req,res){
	(async () => {
		connection.connect();
		const result = await getBooks();
		console.log(result);
		connection.end();
		res.set('Content-Type', 'application/json');
		res.status(200).send(result);
	})();
})

myRouter.route('/addbook')
.post(function(req,res,next){

console.log(req.body);

(async () => {
	connection.connect();
	const result = await addBook(req.body.book);
	console.log("ajout effectué avec succès");
	connection.end();
	res.set('Content-Type', 'application/json');
	res.status(200).send(result);
	})();
})

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
})
