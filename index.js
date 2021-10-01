//Main file Backend
require('dotenv').config()
const db = require("./Database/index.js");
const BookModel = require("./Database/books");
const AuthorModel = require("./Database/authors");
const PublicationModel = require("./Database/publications");


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
var mongoDB = process.env.MONGODB_URL;
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
// http://localhost:3000/book-isbn/12345Three
app.get("/book-isbn/:isbn", async (req, res) => {
  // console.log(req.params);
  const {isbn} = req.params;
  // console.log(isbn);
  const getSpecificBook = await BookModel.findOne({ISBN: isbn});
  // console.log(getSpecificBook);
  
  if (getSpecificBook===null) {
    return res.json({ error: `No Book found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecificBook);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
  const { category } = req.params;
  const getSpecificBooks = await BookModel.find({category:category});

  if (getSpecificBooks.length === 0) {
    return res.json({ error: `No Book found for the category of ${category}` });
  }
  return res.json(getSpecificBooks);
});

//author API
// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
  const getAllAuthors =await AuthorModel.find();
  return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", async(req, res) => {
  // console.log(req.params);
  //params always return string so we need to do id number
  let { id } = req.params;
  // id = Number(id);
  // console.log(isbn);
  const getSpecificAuthor = await AuthorModel.findOne({id:id});
  // console.log(getSpecificAuthor);
  // console.log(getSpecificAuthor.length);
  if (getSpecificAuthor===null) {
    return res.json({ error: `No Author found for the ID of ${id}` });
  }
  return res.json(getSpecificAuthor);
});

//------------------------------------------------

//http://localhost:3000/author-isbn/12Two
app.get("/author-isbn/:isbn", async(req, res) => {
  const { isbn } = req.params;
  const getSpecificAuthors = await AuthorModel.find({books: isbn});
  if (getSpecificAuthors.length===0) {
    return res.json({ error: `No Authors found for the book of ${isbn}` });
  }
  return res.json(getSpecificAuthors);
});

//-----------------------------------------------------------

//Publications API
// http://localhost:3000/publications
app.get("/publications", async(req, res) => {
  const getAllpublications = await PublicationModel.find();
  return res.json(getAllpublications);
});

//--------------->-------------------------->
//http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", async (req, res) => {
  // console.log(req.params);
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificpublication = await PublicationModel.find({books: isbn});
  // console.log(getSpecificpublication);
  // console.log(getSpecificpublication.length);
  if (getSpecificpublication.length === 0) {
    return res.json({ error: `No Publication found for the Book of ${isbn}` });
  }
  return res.json(getSpecificpublication);
});
//------------------------------------------------------
//************************************************** */

//POST API

// http://localhost:3000/book
app.post("/book", async (req, res) => {
  console.log(req.body);
  // const {newBook} = req.body;
  const addNewBook = await BookModel.create(req.body);
  return res.json({
    bookAdded: addNewBook, 
    message:"New Book Added!!!"
  });
  // return res.json({
  //  Books : addNewBook,
  //  message: "Book was added!!!"
  // });

});

// http://localhost:3000/author
app.post("/author", async (req, res) => {
  // console.log(req.body);
  // const {newBook} = req.body;
 
  // db.authors.push(req.body);
  // return res.json(db.authors);
  const addNewAuthor = await AuthorModel.create(req.body);
  return res.json({
    authorAdded: addNewAuthor, 
    message:"New Author Added!!!"
  });
});

//******************************* */
// THIS IS NOT ADDED (ERROR)
// http://localhost:3000/publication
app.post("/publication", async (req, res) => {
  // console.log(req.body);
  // const {newBook} = req.body;
  // db.publications.push(req.body);
  // return res.json(db.publications);
  const addNewPublication = await PublicationModel.create(req.body);
  return res.json({
    PublicationAdded: addNewPublication, 
    message:"New Publication Added!!!"
  });
});
//*********************************** */

//-----------------------------------------------------
//PUT API (updating)
// http://localhost:3000/book-update/12Two
app.put("/book-update/:isbn",async  (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const { isbn } = req.params;
  const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new: true});
  return res.json( {bookUpdated: updateBook, meaagae: " Book was updated"});
});

  //... spread operator
  //use to merge the perviors arrya object with new
  // db.books.forEach((book) => {
  //   if (book.ISBN === isbn) {
  //     console.log({ ...book, ...req.body });
  //     // db.books.push()
  //     return { ...book, ...req.body };
  //   }
  //   return book;
  // });
  // return res.json(db.books);
// });

// http://localhost:3000/author-update/4
app.put("/author-update/:id", async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  // let { id } = req.params;
  // id = Number(id);

  // //... spread operator
  // //use to merge the perviors arrya object with new
  // db.books.forEach((author) => {
  //   if (author.id === id) {
  //     console.log({ ...author, ...req.body });
  //     // db.books.push()
  //     return { ...author, ...req.body };
  //   }
  //   return author;
  // });
  // return res.json(db.authors);
  let { id } = req.params;
  id = Number(id);
 
  const updateAuthor = await AuthorModel.findOneAndUpdate( {id: id}, req.body, {new: true});
  return res.json( {AuthorUpdated: updateAuthor, meaagae: " Author was updated"});
});
//)};

// http://localhost:3000/publication-update/3
app.put("/publication-update/:id",async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  // let { id } = req.params;
  // id = Number(id);

  //... spread operator
  //use to merge the perviors arrya object with new
  // db.books.forEach((publication) => {
  //   if (publication.id === id) {
  //     console.log({ ...publication, ...req.body });
  //     // db.books.push()
  //     return { ...publication, ...req.body };
  //   }
  //   return publication;
  // });
  // return res.json(db.publications);

  let { id } = req.params;
  id = Number(id);
 
  const updatePublication = await PublicationModel.findOneAndUpdate({id: id}, req.body, {new: true});
  return res.json( {PublicationUpdated: updatePublication, meaagae: " Publication was updated"});
});

//--------------------------------------------

//DELETE API

// http://localhost:3000/book-delete/12ONE
app.delete("/book-delete/:isbn",async (req, res) => {
  // console.log(req.body)
  // console.log(req.params);
  // const { isbn } = req.params;
  // const filterBooks = db.books.filter((book) => book.ISBN !== isbn);
  // console.log(filterBooks);
  // db.books = filterBooks;
  // return res.json(db.books);

  const { isbn } = req.params;
  const DeleteBook = await BookModel.deleteOne({ISBN: isbn});
  return res.json( {bookDeleted: DeleteBook, meaagae: " Book was Deleted"});
});

// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", async(req, res) => {
  
  const {isbn, id} = req.params;
  let getSpecificBook = await BookModel.findOne({ISBN: isbn});
  if(getSpecificBook===null) {
      return res.json({"error": `No Book found for the ISBN of ${isbn}`});
  }
  else {
      getSpecificBook.authors.remove(id);
      const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true});
      return res.json( {bookUpdated: updateBook, message: "Author was Deleted from the Book !!!"} );
  }
});

//------------------TASK------------------------------

// http://localhost:3000/author-book-delete/4/12345One
app.delete("/author-book-delete/:isbn/:id", async(req, res) => {
  // console.log(req.body)
  const {id, isbn} = req.params;
  let getSpecificAuthor = await AuthorModel.findOne({id: id});
  if(getSpecificAuthor===null) {
      return res.json({"error": `No Author found for the ID of ${id}`});
  }
  else {
    getSpecificAuthor.authors.remove(isbn);
      const updateBook = await AuthorModel.findOneAndUpdate({id:id}, getSpecificAuthor, {new: true});
      return res.json( {bookUpdated: updateBook, message: "Book was Deleted from the Author !!!"} );
  }
 
});

//PUBLICATION API

//http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", async (req, res) => {
  // console.log(req.body)
  // console.log(req.params);
  let { id } = req.params;
  id = Number(id);
  // const filterPublications = db.publications.filter(
  //   (publication) => publication.id !== id
  // );
  // console.log(filterPublications);
  // db.publications = filterPublications;
  // return res.json(db.publications);
 
  const DeletePublication = await PublicationModel.deleteOne({id: id});
  return res.json( {publicationDeleted: DeletePublication, meaagae: " Publication was Deleted"});
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
