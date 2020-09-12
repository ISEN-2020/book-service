const pg = require('pg');
var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
//Client for postgres db
var pgClient = new pg.Client(connectionString);

//Definition of function connect
function connect(){
  pgClient
   .connect()
   .then(() => console.log('connected'));
}

function getBooks(){
  request = "Select * from Book_list";
  var query = pgClient.query(request)
  .then(res => {
    const data = res.rows;
   console.log('all data');
   data.forEach(row => {
       console.log(`Id: ${row.ID} Name: ${row.Name} Author: ${row.Author} Type: ${row.Type} Publish date: ${row.Publish_date} Available: ${row.Available} Quantity: ${row.Quantity}`);
   })
 });
}

//Definition of function addBook
function addBook(id ,title, author, type, publish_date, available, quantity) {
   request = 'INSERT INTO book_list VALUES ( ' + id + ', ' + title + ', ' + author + ', ' + type + ', ' + publish_date + ', ' + available + ', ' + quantity + ')';
   var query = pgClient.query(request , (err, res)=> {
     if (err) {
         console.error(err);
         return;
     }
     console.log('Book added successfully');
     client.end();
 });
 }

//Definition of function deleteBook
function deleteBook(title, author) {
  request = "DELETE FROM Book_list WHERE title= title and author= author";
  var query = pgClient.query(request , (err, res)=> {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Book deleted successfully');
    client.end();
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

myRouter.route('/Book')
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
});

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
