//Main file Backend

const db = require("./Database/index.js");
const BookModel = require("./Database/books");
// const mongoose = require("mongoose");
// console.log(db);
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");

const app = express();
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = "mongodb+srv://vaishnavi-nawkar:MongoDB_77@cluster0.hqaqy.mongodb.net/Book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));




// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://vaishnavi-nawkar:MongoDB_77@cluster0.hqaqy.mongodb.net/Book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const bcollection = client.db("Book-company").collection("Books").findOne({ISBN: "12345Three"});
//     bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err));
// });
// client.close();


// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databasesList.databases.forEach(db=>console.log(db.name));
// }
// async function main() {
//   const uri = "mongodb+srv://vaishnavi-nawkar:MongoDB_77@cluster0.hqaqy.mongodb.net/Book-company?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         const result = await client.db("Book-company").collection("Books").findOne({ISBN: "12345Three"});
//         console.log(result);
//         // await listDatabases(client);
//     }
//     catch(err) {
//         console.log(err);
//     }
//     finally {
//         await client.close();
//     }
// }
// main();



// http://localhost:3000/
app.get("/", (req, res) => {
  return res.json({
    Welcome: `To The Backend Software Of My Book Distribution Company`,
  });
});
// http://localhost:3000/books
app.get("/books", async (req, res) => {
  // const getAllBooks = db.books;
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
  //we can also use the above line like this.
  // res.json(getAllBooks);
  // res.send(getAllBooks);
});

//this api will give you a book on isbn no that's mean that this api will give you a specific book.
//:isbn refer to the id
// http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn", (req, res) => {
  // console.log(req.params);
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
  // console.log(getSpecificBook);
  // console.log(getSpecificBook.length);
  if (getSpecificBook.length === 0) {
    return res.json({ error: `No Book found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecificBook[0]);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
  const { category } = req.params;
  const getSpecificBooks = db.books.filter((book) =>
    book.category.includes(category)
  );

  if (getSpecificBooks.length === 0) {
    return res.json({ error: `No Book found for the category of ${category}` });
  }
  return res.json(getSpecificBooks);
});

//author API
// http://localhost:3000/authors
app.get("/authors", (req, res) => {
  const getAllAuthors = db.authors;
  return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
  // console.log(req.params);
  //params always return string so we need to do id number
  let { id } = req.params;
  id = Number(id);
  // console.log(isbn);
  const getSpecificAuthor = db.authors.filter((author) => author.id === id);
  // console.log(getSpecificAuthor);
  // console.log(getSpecificAuthor.length);
  if (getSpecificAuthor.length === 0) {
    return res.json({ error: `No Author found for the ID of ${id}` });
  }
  return res.json(getSpecificAuthor[0]);
});

//------------------------------------------------

//http://localhost:3000/author-isbn/12345Two
app.get("/author-isbn/:isbn", (req, res) => {
  const { isbn } = req.params;
  const getSpecificAuthors = db.authors.filter((author) =>
    author.books.includes(isbn)
  );
  if (getSpecificAuthors.length === 0) {
    return res.json({ error: `No Authors found for the isbn of ${isbn}` });
  }
  return res.json(getSpecificAuthors);
});

//-----------------------------------------------------------

//Publications API
// http://localhost:3000/publications
app.get("/publications", (req, res) => {
  const getAllpublications = db.publications;
  return res.json(getAllpublications);
});

//--------------->-------------------------->
//http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {
  // console.log(req.params);
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificpublication = db.publications.filter((publication) =>
    publication.books.includes(isbn)
  );
  // console.log(getSpecificpublication);
  // console.log(getSpecificpublication.length);
  if (getSpecificpublication.length === 0) {
    return res.json({ error: `No Publication found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecificpublication);
});
//------------------------------------------------------
//************************************************** */

//POST API

// http://localhost:3000/book
app.post("/book", (req, res) => {
  console.log(req.body);
  // const {newBook} = req.body;
  db.books.push(req.body);
  return res.json(db.books);
});

// http://localhost:3000/author
app.post("/author", (req, res) => {
  // console.log(req.body);
  // const {newBook} = req.body;
  db.authors.push(req.body);
  return res.json(db.authors);
});

//******************************* */
// http://localhost:3000/publication
app.post("/publication", (req, res) => {
  // console.log(req.body);
  // const {newBook} = req.body;
  db.publications.push(req.body);
  return res.json(db.publications);
});
//*********************************** */

//-----------------------------------------------------
//PUT API (updating)
// http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { isbn } = req.params;

  //... spread operator
  //use to merge the perviors arrya object with new
  db.books.forEach((book) => {
    if (book.ISBN === isbn) {
      console.log({ ...book, ...req.body });
      // db.books.push()
      return { ...book, ...req.body };
    }
    return book;
  });
  return res.json(db.books);
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  let { id } = req.params;
  id = Number(id);

  //... spread operator
  //use to merge the perviors arrya object with new
  db.books.forEach((author) => {
    if (author.id === id) {
      console.log({ ...author, ...req.body });
      // db.books.push()
      return { ...author, ...req.body };
    }
    return author;
  });
  return res.json(db.authors);
});

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  let { id } = req.params;
  id = Number(id);

  //... spread operator
  //use to merge the perviors arrya object with new
  db.books.forEach((publication) => {
    if (publication.id === id) {
      console.log({ ...publication, ...req.body });
      // db.books.push()
      return { ...publication, ...req.body };
    }
    return publication;
  });
  return res.json(db.publications);
});

//--------------------------------------------

//DELETE API

// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req, res) => {
  // console.log(req.body)
  console.log(req.params);
  const { isbn } = req.params;
  const filterBooks = db.books.filter((book) => book.ISBN !== isbn);
  console.log(filterBooks);
  db.books = filterBooks;
  return res.json(db.books);
});

// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
  // console.log(req.body)
  console.log(req.params);
  let { isbn, id } = req.params;
  id = Number(id);

  db.books.forEach((book) => {
    if (book.ISBN === isbn) {
      console.log({ ...book, ...req.body });
      if (!book.authors.includes(id)) {
        return;
      }
      // db.books.push()
      book.authors = book.authors.filter((author) => author !== id);
      return book;
    }
    return book;
  });
  return res.json(db.books);

  // db.books = filterBooks;
  // return res.json(db.books)
});

//------------------TASK------------------------------

// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:isbn/:id", (req, res) => {
  // console.log(req.body)
  console.log(req.params);
  let { id, isbn } = req.params;
  id = Number(id);

  db.authors.forEach((author) => {
    if (author.id === id) {
      console.log({ ...author, ...req.body });
      if (!author.books.includes(isbn)) {
        return;
      }
      // db.books.push()
      author.books = author.books.filter((book) => book !== ISBN);
      return author;
    }
    return author;
  });
  return res.json(db.authors);

  // db.books = filterBooks;
  // return res.json(db.books)
});

//PUBLICATION API

//http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", (req, res) => {
  // console.log(req.body)
  console.log(req.params);
  let { id } = req.params;
  id = Number(id);
  const filterPublications = db.publications.filter(
    (publication) => publication.id !== id
  );
  console.log(filterPublications);
  db.publications = filterPublications;
  return res.json(db.publications);
});

//-----------------------------------------------------
//http://localhost:3000/author-delete/2
app.delete("/author-delete/:id", (req, res) => {
  // console.log(req.body)
  console.log(req.params);
  let { id } = req.params;
  id = Number(id);
  const filterauthors = db.authors.filter((author) => author.id !== id);
  console.log(filterauthors);
  db.authors = filterauthors;
  return res.json(db.authors);
});

app.listen(3000, () => {
  console.log("MY Express app is running");
});
