var pg = require("pg");

var connectionString = "postgres://admin:admin@192.168.99.104:5432/library";

var pgClient = new pg.Client(connectionString);

function connect(){

pgClient
 .connect()
 .then(() => console.log('connected'));

 var query = pgClient.query("SELECT * from book_list")
 .then(() => console.log('Request Ok'));
}

function addBook(Books) {
   request = 'INSERT INTO book_list VALUES (' + title + ', ' + author + ', ' + type + ', ' + publish_date + ', ' + available + ', ' + quantity + ')';
   var query = pgClient.query(request , (err, res)=> {
     if (err) {
         console.error(err);
         return;
     }
     console.log('Book added successfully');
     client.end();
 });
 }

 function getBooks(){
   request = "Select * from Book_list";
   var query = pgClient.query(request)
   .then(res => {
      const data = res.rows;
      data.forEach(row => {
        console.log(`Id: ${row.ID} Name: ${row.Name} Author: ${row.Author} Type: ${row.Type} Publish date: ${row.Publish_date} Available: ${row.Available} Quantity: ${row.Quantity}`);
        client.end();
    })
  });
}

connect();
getBooks();
//addBook(1,"sansotta" , "moi", "type", 2020-09-12, "t", 4);
