const mysql = require('mysql2');
const express = require('express');

let connection;  // Declare the connection variable

// Function to set up the MySQL connection based on provided parameters
function setUpConnection(host, port, user, password, database) {
  connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database
  });
}

// Example usage: set up the connection based on environment variables or other sources
const host = process.env.DB_HOST || "192.168.56.1";  // Use environment variable or default IP
const port = process.env.DB_PORT || "3308";  // Use environment variable or default port
const user = process.env.DB_USER || "root";  // Use environment variable or default user
const password = process.env.DB_PASSWORD || "helloworld";  // Use environment variable or default password
const database = process.env.DB_DATABASE || "library";  // Use environment variable or default database

setUpConnection(host, port, user, password, database);  // Set up the connection

// Rest of your code using the 'connection' variable


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to get books from the database
async function getBooks() {
	return new Promise((resolve, reject) => {
	  connection.query("SELECT name, author, book_type, description, publish_date, quantity FROM book_list", (error, results) => {
		if (error) {
		  reject(new Error('Error fetching books: ' + error.message));
		} else {
		  resolve(results);
		}
	  });
	});
  }
  

// Function to add a book to the database
async function addBook(book) {
  try {
    const sql = "INSERT INTO book_list (name, author, book_type, description, publish_date, quantity) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [book.name, book.author, book.book_type, book.description, book.publishDate, book.quantity];
    const [result] = await connection.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error('Error adding book: ' + error.message);
  }
}

// API endpoint to get books
app.get('/getbooks', async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to add a book
app.post('/addbook', async (req, res) => {
  try {
    const book = req.body.book;
    const result = await addBook(book);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port_serv = 3000;
app.listen(port_serv, () => {
  console.log("Server running at http://localhost:" + port);
});
