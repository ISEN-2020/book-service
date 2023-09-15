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
const host = process.env.DB_HOST;  // Use environment variable or default IP
const port = process.env.DB_PORT || "3308";  // Use environment variable or default port
const user = process.env.DB_USER || "root";  // Use environment variable or default user
const password = process.env.DB_PASSWORD || "helloworld";  // Use environment variable or default password
const database = process.env.DB_DATABASE || "library";  // Use environment variable or default database

setUpConnection(host, port, user, password, database);  // Set up the connection

// Rest of your code using the 'connection' variable

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// Function to get books from the database
async function getBooks() {
	return new Promise((resolve, reject) => {
	  connection.query("SELECT Id,name, author, book_type, description, publish_date, quantity FROM book_list", (error, results) => {
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
		const sql = "INSERT INTO book_list (name, author, book_type, description, Publish_date, quantity) VALUES (?, ?, ?, ?, ?, ?)";
		const values = [book.name, book.author, book.book_type, book.description, book.Publish_date, book.quantity];
		const result = await new Promise((resolve, reject) => {
		  connection.query(sql, values, (error, results) => {
			if (error) {
			  reject(new Error('Error adding book: ' + error.message));
			} else {
			  resolve(results);
			}
		  });
		});
		return result;
	  } catch (error) {
		throw new Error('Error adding book: ' + error.message);
	  }
	}

// Function to update a book to the database
async function updateBook(bookId, updatedBook) {
	try {
		const sql = `UPDATE book_list SET name = ?, author = ?, book_type = ?, description = ?, Publish_date = ?, quantity = ? WHERE Id = ?`;
		const values = [updatedBook.name,updatedBook.author,updatedBook.book_type,updatedBook.description,updatedBook.Publish_date,updatedBook.quantity,bookId];
		const result = await new Promise((resolve, reject) => {
		connection.query(sql, values, (error, results) => {
			if (error) {
			reject(new Error('Error updating book: ' + error.message));
			} else {
			resolve(results);
			}
		});
		});
	
		return result;
	} catch (error) {
		throw new Error('Error updating book: ' + error.message);
	}
	}

// Function to update a book to the database
async function deleteBook(bookId) {
	try {
		const sql = `DELETE FROM book_list WHERE Id = ?`;
		const result = await new Promise((resolve, reject) => {
		connection.query(sql, [bookId], (error, results) => {
			if (error) {
			reject(new Error('Error deleting book: ' + error.message));
			} else {
			resolve(results);
			}
		});
		});
	
		return result;
	} catch (error) {
		throw new Error('Error deleting book: ' + error.message);
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
    const book = req.body;
    const result = await addBook(book);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to Update a book
app.post('/updatebook', async (req, res) => {
	try {
	  const bookId = req.body.bookId; // L'identifiant du livre à mettre à jour
	  const updatedBook = req.body.updatedBook; // Les nouvelles données du livre
  
	  const result = await updateBook(bookId, updatedBook);
	  res.status(200).json(result);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });

// API endpoint to delete a book
app.delete('/deletebook/:id', async (req, res) => {
	try {
	  const bookId = req.params.id; // L'identifiant du livre à supprimer
	  // Appel de la fonction deleteBook
	  const result = await deleteBook(bookId);
	  res.status(200).json({ message: 'Book deleted successfully', result });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });

// Start the server
const port_serv = 3000;
app.listen(port_serv, () => {
  console.log("Server running at http://localhost:" + port_serv);
});
