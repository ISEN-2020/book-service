//Definition of function connect
function connect(){
const pg = require('pg');
var connectionString = "postgres://user:password@localhost:port/nameofdatabase";

//Definition of function connect
function connect(){
  //Client for postgres db
  var pgClient = new pg.Client(connectionString);
  pgClient
   .connect()
   .then(() => console.log('connected'));
}

function getBook(id) {
  request = "SELECT Name from book_list where ID = '";
  request2  = request.concat(id,"");
  StringRequest = request2.concat("","'");
  var query = pgClient.query(StringRequest);
  query.on("row", function(row,result){

  return result.addRow(row);
  });
}

//Definition of function addBook
function addBook(title, author, type, publish_date, Available, quantity, who_borrowed) {
  request = "INSERT INTO book_list (Name, Author, Type, publish_date, Available, quantity) values (title, Name, Type, publish_date, available, quantity)";
  var query = pgClient.query(request , (err, res)=> {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Book added successfully');
    client.end();
});
}

function updateBook(id, title, author, type, publish_date, available, quantity)
{
  getBook(id);

  const Sequelize = require('sequelize');
  sequelize = new Sequelize(connectionString);

  let bookLst = sequelize.define('book_list')
  let id = await bookLst.update({
    Name: title,
    Author: author,
    Type: type,
    Publish_date: publish_date,
    Available: available,
    Quantity, quantity }
    { where: { ID: id } }).then(console.log('book id: ' + id + ' is updated.'));

  sequelize.close();
}

//Definition of function deleteBook
function deleteBook(title, author) {
  request = "DELETE FROM book_list WHERE title= title and author= author";
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

myRouter.route('/book')
.get(function(req,res){
      res.json({message : "List all books", methode : req.method});
      connect();
      getBook();
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

.update(function(req,res){
    res.json({message : "Update book", methode : req.nethod});
    updateBook();
});

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
