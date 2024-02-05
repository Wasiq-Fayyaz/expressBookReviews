const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const books = require("./booksdb");

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

async function getBooks() {
    return await JSON.stringify(books, null, 2); // 2 is the number of spaces for indentation
  }

  async function getBookDetails(isbn) {
    const book = await Object.values(books).find((book) => book.isbn === isbn);
    const promise = new Promise ((res,rej) => {
        return book ? JSON.stringify(book, null, 2) : "Book not found";
    })
  }
  function getBooksByAuthor(author) {
    const matchingBooks = Object.keys(books)
      .filter((key) => books[key].author === author)
      .map((key) => books[key]);
    return matchingBooks.length
      ? JSON.stringify(matchingBooks, null, 2)
      : "Books by author not found";
  }

 async function getBooksByTitle(title) {
    const matchingBooks = Object.keys(books)
      .filter((key) => books[key].title === title)
      .map((key) => books[key]);
    const promise = new Promise((res, rej) => {
        return await matchingBooks.length
      ? JSON.stringify(matchingBooks, null, 2)
      : "Books by title not found";
    })
  }
// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  const bookslist = await getBooks();
  return res.send(bookslist)
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    const isbn = req.params.isbn;
    const bookDetails = await getBookDetails(isbn);
    return res.send(bookDetails);
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    const author = req.params.author;
    const booksByAuthor = await getBooksByAuthor(author);
    return res.send(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksByTitle = getBooksByTitle(title);
    return res.send(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
