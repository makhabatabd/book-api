const mistake = document.getElementById("error");
const logInMistake = document.getElementById("log-in__error");
const person = JSON.parse(localStorage.getItem("user"));

export const LogInData = async (user) => {
  const response = await fetch("http://localhost:1717/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data;
  } else {
    logInMistake.innerText = `${data}`;
  }
};

export const registerData = async (user) => {
  const response = await fetch("http://localhost:1717/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data;
  } else {
    mistake.innerText = `${data}`;
  }
};

export const addBook = async (newBook) => {
  const response = await fetch("http://localhost:1717/books/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": person.token,
    },
    body: JSON.stringify(newBook),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data;
  }
};

let books;

export const getBooks = async () => {
  const response = await fetch("http://localhost:1717/books", {
    method: "GET",
    headers: {
      "X-Auth": person.token,
    },
  });
  books = await response.json();
  if (response.ok) {
    books.genres = new Set(books.genres);
    return books;
  }
};

export const getOneBook = async (id) => {
  const response = await fetch(`http://localhost:1717/books/${id}`, {
    method: "GET",
    headers: {
      "X-Auth": person.token,
    },
  });
  let book = await response.json();
  if (response.ok) {
    book.genres = new Set(book.genres);
    return book;
  }
};

export const deleteBook = async (id) => {
  const response = await fetch(`http://localhost:1717/books/delete/${id}`, {
    method: "DELETE",
    headers: {
      "X-Auth": person.token,
    },
  });
  books = await response.json();
  if (response.ok) {
    return books;
  }
};

export const updateBook = async (id, editBook) => {
  const response = await fetch(`http://localhost:1717/books/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": person.token,
    },
    body: JSON.stringify(editBook),
  });
  let data = await response.json();
  if (response.ok) {
    return data;
  }
};
