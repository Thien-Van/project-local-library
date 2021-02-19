function findAuthorById(authors, id) {
  // using the find() method to find the author with the matching id
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  // using the find() method to find the book with the matching id
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // declaring all 3 arrays needed
  let allBooks = [];
  let isOut = [];
  let isIn = [];

  //looping through the books array
  books.forEach((book) => {
    const borrowed = book.borrows;
    // for each book I am using the some() method to see if there is a false statement in the return key of the borrows object
    const isBorrowed = borrowed.some((position) => position.returned === false);
    // if the check above is true I push the current book in the isOut array, otherwise i push it in the isIn array
    if (isBorrowed) {
      isOut.push(book);
    } else {
      isIn.push(book);
    }
  });

  return (allBooks = [isOut, isIn]);
}

function getBorrowersForBook({ borrows }, accounts) {
  // declaring the array to collect the account objects
  let borrowers = [];

  // iterating through the borrows array in the given book
  borrows.forEach((borrow) => {
    // find the account id that matches the id in the current borrow object
    const borrower = accounts.find((account) => account.id === borrow.id);
    // adding the returned key to the object above and setting its value to the same as in the current borrow object of the book
    borrower.returned = borrow.returned;
    // checking if the borrowers array already holds 10 objects, if not, push the borrower object
    if (borrowers.length < 10) borrowers.push(borrower);
  });

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
