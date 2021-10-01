//database 
//here we are using js object as a database
//we required 3 JS object

//here is our first object i.e books
let books = [
    {
     //unique id for book 
     //primary key in database
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1,
    },
    {
      ISBN: "12345Two",
      title: "Getting started with Python",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-08-07",
      numOfPage: 550,
      category: ["fiction", "tech", "web dev"],
      publication: 1,
    }
  ];
  
  //second object as a database i.e authors
  let authors = [
    {
      id: 1,
      name: "nikhil",
      books: ["12345ONE", "12345Two"],
    },
    {
      id: 2,
      name: "ram",
      books: ["12345ONE", "12345Two"],
    }
  ];
  

  //third object as  database i.e publications
  let publications = [
    {
      id: 1,
      name: "ShapeAI Publications",
      books: ["12345ONE", "12345Two"],
    },
    {
      id: 2,
      name: "Agarwal Publications",
      books: [],
    }
  ];
  
  module.exports = {books, authors, publications};