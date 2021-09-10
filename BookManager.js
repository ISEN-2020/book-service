
//connection String for the database
//import Express from "express";

//var query = pgClient.query("SELECT ID from Book_list where name = 'customername'");
var pgClient;
var connectionString;
//object used to store and output data to the UI.
function Books(id,book_name,author,book_type,publishDate,quantity){
  this.id = id;
  this.book_name = book_name;
  this.author = author;
  this.book_type = book_type;
  this.publishDate = publishDate;
  this.quantity = quantity;
}

function test(){
console.log("chdkd,lf");
}

function connect(){
 connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
  //Client for postgres db
 pgClient = new pg.Client(connectionString);
  //Connect to db
 pgClient.connect();
}
//Retrieve a book by searching for his ID
function getBook(id) {
  request = "SELECT Name from Book_list where ID = '";
  request2  = request.concat(id,"");
  StringRequest = request2.concat("","'");
  var query = pgClient.query(StringRequest);
  query.on("row", function(row,result){
  return result.addRow(row);
  });
}
//Allows us to check if a book is available or not
function isAvailable(name){
    request = "SELECT Available from Book_list where Name = '";
    request2  = request.concat(Name,"");
    StringRequest = request2.concat("","'");
    var query = pgClient.query(StringRequest);
    query.on("row", function(row,result){
      if(result.addRow(row) === True){
        return True;
      }
     else{
       return False;
     }
    });
}

function getBooks(){
  request = "Select * from Book_list";
  var query = pgClient.query(request);
  query.on("row",function(row,result){
    result.addRow(row);
    console.log(result[0]);
  });
}
