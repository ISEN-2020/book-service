const mysql = require('mysql2');
const express = require('express');

const connection = mysql.createConnection({
  host: "192.168.56.1",
  port: "3308",
  user: "root",
  password: "helloworld",
  database: "library"
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to get books from the database
async function getBooks() {
  try {
    const [rows, fields] = await connection.execute("SELECT id,name, author, book_type, description, publish_date, quantity FROM book_list");
    return rows;
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
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
const port = 3000;
app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
