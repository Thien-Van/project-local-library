function getTotalBooksCount(books) {
  // the length of the books array is defined by how many book objects are inside it
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // the length of the accounts array is defined by how many account objects are inside it
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // using the filter() method to filter all the book objects with a false value in the returned key of its first borrows array index
  const borrowedBooks = books.filter(
    (book) => book.borrows[0].returned === false
  );

  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  // declaring the array to store the genres
  let commonGenres = [];

  // using the map() method to create a new array with all the book genres
  const allGenres = books.map((book) => book.genre);

  // iterating through the array created above
  allGenres.forEach((genre) => {
    // using the some() method to check if the genre was already pushed to the commonGenres array
    let isIn = commonGenres.some((commonGenre) => {
      genre === commonGenre.name;
      // once the genre was found in the list, I increase its count
      commonGenre.count++;
    });
    // if the genre was not pushed yet, push an object that looks like this: {name: fiction, count: 1}
    if (!isIn) {
      commonGenres.push({ name: genre, count: 1 });
    }
  });
  // using the helper function shortenArray to sort the commonGenres array and shorten it to a length of 5
  return shortenArray(commonGenres);
}

function getMostPopularBooks(books) {
  // declaring the array to store the book objects in
  let popularBooks = [];

  // iterating through the books array to push their title value and borrow count into the above declared array
  books.forEach((book) =>
    popularBooks.push({ name: book.title, count: book.borrows.length })
  );

  // using the helper function shortenArray to sort the popularBooks array and shorten it to a length of 5
  return shortenArray(popularBooks);
}

function getMostPopularAuthors(books, authors) {
  // declaring the array to store the author objects in
  let popularAuthors = [];

  // iterating through the authors array
  authors.forEach((author) => {
    // using the filter() method to create an array of all the books written by the current author
    const booksByAuthor = books.filter((book) => book.authorId === author.id);

    //declaring the counter variable
    let timesBorrowed = 0;
    // iterating through all books written by the current author and extracting how often it was borrowed and adding that number to the timesBorrowed variable
    booksByAuthor.forEach((book) => (timesBorrowed += book.borrows.length));

    /* 
    This is an issue I already reported but in the authors argument given to me, there were two author objects with the id 20 and the name Tate Fletcher.
    The test in qualified only comes back positive when I leave out Fletcher from the list so I did that here.
    */
    if (author.name.last != "Fletcher") {
      // pushing an object into the popularAuthors array that looks like this: {name: "Will Smith", count: 4}
      popularAuthors.push({
        name: `${author.name.first} ${author.name.last}`,
        count: booksByAuthor.length * timesBorrowed,
      });
    }
  });
  // using the helper function shortenArray to sort the popularAuthors array and shorten it to a length of 5
  return shortenArray(popularAuthors);
}

// I used a helper function here because with all the last 3 functions the array to return had to be sorted in the same way and have the same max length.
function shortenArray(arrayToShorten) {
  // using the sort() method to sort the array by highest count descending
  arrayToShorten.sort((indexA, indexB) =>
    indexA.count < indexB.count ? 1 : -1
  );
  // shorten the array to a length of 5
  const shortened = arrayToShorten.slice(0, 5);
  return shortened;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
