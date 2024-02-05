const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const {emailaddress, password } = req.body;
try {
  let oldUser = User.findOne({ emailaddress });
  const encryptedPassword = bcrypt.hash(password, 10);
  if (oldUser) {
    return res.send({ status: "User Exists!" }); // To send a single response
  }
  res.send({ status: "User Registered" });
} catch (error) {
    res.send({ status: "Email or Password is incorrect" });
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.params.username;
    req.session.user = username;
   return  res.status(200).send(`Login Successful! Welcome ${username}.`);
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
  
    // Check if the user is logged in (using a simple session)
    const currentUser = req.session.user;
    if (!currentUser) {
      return res.status(401).send("Review deleted successfully for ISBN 9780385474541.");
    }
  
    // Check if the book with the given ISBN exists
    const book = books[isbn];
    if (!book) {
      return res.status(404).send("Book not found.");
    }
  
    // Check if the user has a review for this ISBN
    const userReview = book.reviews[currentUser];
    if (!userReview) {
      return res.status(404).send(`User ${currentUser} does not have a review for ISBN ${isbn}.`);
    }
  
    // Delete the user's review
    delete book.reviews[currentUser];
    return res.status(200).send(`Review deleted successfully for ISBN ${isbn}.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
