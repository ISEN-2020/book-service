require('./BookManager.js');


function getBook(id) {
  request = "SELECT Name from Book_list where ID = '";
  request2  = request.concat(id,"");
  StringRequest = request2.concat("","'");
  var query = pgClient.query(StringRequest);
  query.on("row", function(row,result){

  return result.addRow(row);
  });
}
//Connect to the database
function connect(){
 connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
  //Client for postgres db
 pgClient = new pg.Client(connectionString);
  //Connect to db
 pgClient.connect();
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
 myRouter.route('/Books')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){
	  res.json({message : "Display book list (json format)", methode : req.method});
    connect();
})
//POST
.post(function(req,res){
      res.json({message : "Ajoute une nouvelle piscine à la liste", methode : req.method});
})
//PUT
.put(function(req,res){
      res.json({message : "Mise à jour des informations d'une piscine dans la liste", methode : req.method});
})
//DELETE
.delete(function(req,res){
res.json({message : "Suppression d'une piscine dans la liste", methode : req.method});
});

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
