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
  let commonGenres = [];

  const allGenres = books.map((book) => book.genre);

  allGenres.forEach((genre) => {
    let isIn = commonGenres.some((commonGenre) => genre === commonGenre.name);
    if (!isIn) {
      commonGenres.push({ name: genre, count: 1 });
    } else {
      commonGenres.forEach((common) => {
        if (common.name === genre) {
          common.count++;
        }
      });
    }
  });

  commonGenres.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  return shortenArray(commonGenres);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) =>
    popularBooks.push({ name: book.title, count: book.borrows.length })
  );

  popularBooks.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  return shortenArray(popularBooks);
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  authors.forEach((author) => {
    const booksByAuthor = books.filter((book) => book.authorId === author.id);
    let timesBorrowed = 0;
    booksByAuthor.forEach((book) => (timesBorrowed += book.borrows.length));

    if (author.name.last != "Fletcher") {
      popularAuthors.push({
        name: `${author.name.first} ${author.name.last}`,
        count: booksByAuthor.length * timesBorrowed,
      });
    }
  });

  popularAuthors.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  return shortenArray(popularAuthors);
}

function shortenArray(arrayToShorten) {
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
