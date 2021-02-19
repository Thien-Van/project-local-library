function findAccountById(accounts, id) {
  // using the find() method to find the account that matches the input id and return the found account
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // declaring the array that will hold all accounts sorted by last name.
  let listByName = [];

  // using the sort() method to sort the accounts array by last names of the account owners alphabetically.
  // not using the default sort() method to ensure more control.
  accounts.sort((accountA, accountB) =>
    // using dot notation to access the last value in the name object in the account object.
    accountA.name.last > accountB.name.last ? 1 : -1
  );

  // taking the sorted accounts array I am using the reduce() method to rearrange every account object in the array.
  accounts.reduce((acc, account) => {
    // declaring the variable fullName to make the code more readable
    const fullName = account.name;
    // at every iteration I create an object with the name object as the first key followed by the rest of the account keys and push that object into the listByName array
    acc = { name: fullName, account };
    listByName.push(acc);
  }, []);

  return listByName;
}

function getTotalNumberOfBorrows({ id }, books) {
  // I destructured the accounts parameter because I only need its id
  // declaring the accumulator variable
  let borrows = 0;
  // looping through the books array
  books.forEach((book) => {
    // checking if the id of the user can be found in the borrows array of the current book object and adding 1 to the borrows variable if true
    if (book.borrows.some((user) => user.id === id)) {
      borrows++;
    }
  });

  return borrows;
}

function getBooksPossessedByAccount({ id }, books, authors) {
  // declaring the array of currently checked out books
  let currentlyCheckedOut = [];

  // looping through the books array
  for (let book in books) {
    // declaring variables, destructuring the book objects for better readability
    const thisBook = books[book];
    const borrowers = thisBook.borrows;
    // checking if the account id can be found in the current book borrows array and if true, if the book has been returned
    const isOut = borrowers.some(
      (borrow) => borrow.id === id && !borrow.returned
    );
    // if the check above is true, I am using the find() method to find the author who wrote the book

    if (isOut) {
      let writer = authors.find((author) => author.id === thisBook.authorId);
      // declaring a variable and assigning the current book to it
      let match = thisBook;
      // creating a the new key author in the match object
      match.author = writer;
      // pushing the match object into the array of currently checked out books
      currentlyCheckedOut.push(match);
    }
  }

  return currentlyCheckedOut;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
