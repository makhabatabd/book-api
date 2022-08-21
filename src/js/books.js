import { getBooks } from "./api";
import { deleteBook } from "./api";
import { addBook } from "./api";
import { getOneBook } from "./api";
import { updateBook } from "./api";
if (
  window.location.pathname.endsWith("/list.html") &&
  JSON.parse(localStorage.getItem("user"))
) {
  const bookOutter = document.querySelector(".card__outter");
  const add = document.querySelector("#add");
  const closeAddModal = document.querySelector("#add-close");
  const modalOutter = document.querySelector(".modal__outter");
  let addNameInput = document.querySelector("#add-name");
  const addNameSpan = document.querySelector("#add-name__span");
  let addAuthorInput = document.querySelector("#add-author");
  const addAuthorSpan = document.querySelector("#add-author__span");
  let addInputs = document.querySelectorAll(".add-input");
  const addButton = document.querySelector("#add-button");
  let yearInput = document.querySelector("#add-year");
  let houseInput = document.querySelector("#add-house");
  let pagesInput = document.querySelector("#add-pages");
  let genreInput = document.querySelectorAll("#add-genre");
  let languageInput = document.querySelector("#add-language");
  const editSaveButton = document.querySelector("#edit-button");
  const editId = document.querySelector("#edit-id");
  const detailsContainer = document.querySelector(".details-container");
  const overlayInner = document.querySelector(".overlay-inner");
  const blankHeart = document.querySelector(".blank-heart");
  const redHeart = document.querySelector(".red-heart");
  let searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");

  //search
  searchButton.addEventListener("click", () => {
    let searchValue = searchInput.value.toLowerCase().replace(/\s/g, "");
    location.replace("http://localhost:3000/search.html?" + searchValue);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let searchValue = searchInput.value.toLowerCase().replace(/\s/g, "");
      location.replace("http://localhost:3000/search.html?" + searchValue);
    }
  });

  //Add modal logic
  let newBook = {
    name: "",
    author: "",
    isFavorite: false,
    publishYear: 0,
    publishHouse: "",
    pagesNumber: 0,
    genres: [],
    originalLanguage: "",
  };

  add.addEventListener("click", () => {
    modalOutter.style.display = "flex";
    editSaveButton.classList.add("disabled");
    addButton.classList.remove("disabled");
  });

  closeAddModal.addEventListener("click", () => {
    modalOutter.style.display = "none";
    addNameInput.value = "";
    addAuthorInput.value = "";
    yearInput.value = "";
    houseInput.value = "";
    pagesInput.value = "";
    genreInput.forEach((item) => {
      item.removeAttribute("checked");
    });
    languageInput.value = "";
  });

  const modalValidation = () => {
    !addNameInput.value
      ? (addNameSpan.innerText = "this field is required")
      : (addNameSpan.innerText = "");
    !addAuthorInput.value
      ? (addAuthorSpan.innerText = "this field is required")
      : (addAuthorSpan.innerText = "");
    addInputs.forEach((item) => {
      if (!item.value) {
        item.classList.add("red-border");
      }
    });
  };

  function bookNameValidation() {
    !addNameInput.value
      ? (addNameSpan.innerText = "this field is required")
      : (addNameSpan.innerText = "");
  }

  function bookAuthorValidation() {
    !addAuthorInput.value
      ? (addAuthorSpan.innerText = "this field is required")
      : (addAuthorSpan.innerText = "");
  }

  function addInputsValidation() {
    addInputs.forEach((item) => {
      if (!item.value) {
        item.classList.add("red-border");
      } else {
        item.classList.remove("red-border");
      }
    });
  }

  function removeAddSpans() {
    addNameSpan.innerText = "";
    addAuthorSpan.innerText = "";
    addInputs.forEach((item) => {
      item.classList.remove("red-border");
    });
  }
  let checkedArray = [];

  //get books logic
  window.onload = async () => {
    let trashIcon;
    let editIcon;
    let heartIcon;
    let infoIcon;
    async function mapBooks() {
      let books = await getBooks();
      bookOutter.innerHTML = "";
      let count = 0;
      books.map((book) => {
        if (book.isFavorite === true) {
          count = count + 1;
          let bookList = `<div class="card" id=${book.id}>
                   <img src="https://scolarcardiff.files.wordpress.com/2012/06/scan0013.jpg" alt="book pic"/>
                    <div class="bottom">
                        <p class="card__author">${book.author}</p>
                        <h3 class="card__title">${book.name}</h3>
                        <div class="card__icons">
                         <svg
                              id="heart"
                              class="color__heart"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                         <path d="M11.4662 22.276C11.6072 22.42 11.7992 22.5 12.0002 22.5C12.2012 22.5 12.3932 22.42 12.5342 22.276L22.1282 12.555C24.6192 10.032 24.6192 5.925 22.1282 3.401C20.9182 2.175 19.3092 1.5 17.5962 1.5C15.8832 1.5 14.2752 2.175 13.0652 3.4L12.0002 4.48L10.9352 3.401C9.72516 2.175 8.11616 1.5 6.40416 1.5C4.69116 1.5 3.08216 2.175 1.87216 3.401C-0.618844 5.925 -0.618844 10.032 1.87216 12.554L11.4662 22.276ZM2.93916 4.454C3.86516 3.517 5.09616 3 6.40316 3C7.71116 3 8.94116 3.517 9.86616 4.455L11.4652 6.075C11.7462 6.36 12.2512 6.36 12.5322 6.075L14.1312 4.454C15.0592 3.517 16.2892 3 17.5962 3C18.9042 3 20.1342 3.517 21.0602 4.454C22.9772 6.397 22.9772 9.558 21.0602 11.502L12.0002 20.683L2.93916 11.501C1.02216 9.559 1.02216 6.397 2.93916 4.454Z" />  </svg>
                        <svg id="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                        <svg id="trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                        <svg id="info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"/></svg>
                        </div>
                    </div>
                </div>
              `;
          bookOutter.insertAdjacentHTML("beforeend", bookList);
        } else {
          let bookList = `<div class="card" id=${book.id}>
                   <img src="https://scolarcardiff.files.wordpress.com/2012/06/scan0013.jpg" alt="book pic"/>
                    <div class="bottom">
                        <p class="card__author">${book.author}</p>
                        <h3 class="card__title">${book.name}</h3>
                        <div class="card__icons">
                         <svg
                              id="heart"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                         <path d="M11.4662 22.276C11.6072 22.42 11.7992 22.5 12.0002 22.5C12.2012 22.5 12.3932 22.42 12.5342 22.276L22.1282 12.555C24.6192 10.032 24.6192 5.925 22.1282 3.401C20.9182 2.175 19.3092 1.5 17.5962 1.5C15.8832 1.5 14.2752 2.175 13.0652 3.4L12.0002 4.48L10.9352 3.401C9.72516 2.175 8.11616 1.5 6.40416 1.5C4.69116 1.5 3.08216 2.175 1.87216 3.401C-0.618844 5.925 -0.618844 10.032 1.87216 12.554L11.4662 22.276ZM2.93916 4.454C3.86516 3.517 5.09616 3 6.40316 3C7.71116 3 8.94116 3.517 9.86616 4.455L11.4652 6.075C11.7462 6.36 12.2512 6.36 12.5322 6.075L14.1312 4.454C15.0592 3.517 16.2892 3 17.5962 3C18.9042 3 20.1342 3.517 21.0602 4.454C22.9772 6.397 22.9772 9.558 21.0602 11.502L12.0002 20.683L2.93916 11.501C1.02216 9.559 1.02216 6.397 2.93916 4.454Z" />  </svg>
                        <svg id="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                        <svg id="trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                        <svg id="info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"/></svg>
                        </div>
                    </div>
                </div>
              `;
          bookOutter.insertAdjacentHTML("beforeend", bookList);
        }

        //favorites show in header red or blank
        async function mapFavorites() {
          let books = await getBooks();
          let count = 0;
          books.map((book) => {
            if (book.isFavorite === true) {
              blankHeart.style.display = "none";
              redHeart.style.display = "block";
              count = count + 1;
            } else if (count === 0) {
              blankHeart.style.display = "block";
              redHeart.style.display = "none";
            }
          });
        }
        mapFavorites();

        //delete logic
        trashIcon = document.querySelectorAll("#trash");
        editIcon = document.querySelectorAll("#edit");
        heartIcon = document.querySelectorAll("#heart");
        infoIcon = document.querySelectorAll("#info");

        trashIcon.forEach((item) => {
          item.addEventListener("click", async () => {
            await deleteList(item);
            mapBooks();
          });
        });
      });
    }
    await mapBooks();

    async function deleteList(item) {
      const bookId = item.closest(".card").id;
      return deleteBook(bookId);
    }

    //details logic
    let closeBtn;
    async function infoHandler() {
      infoIcon.forEach((item) => {
        item.addEventListener("click", async () => {
          detailsContainer.style.display = "flex";
          const bookId = item.closest(".card").id;
          let book = await getOneBook(bookId);
          let renderBook = `<div class="inner-box">
                  <button class="close"><img id="details-close" src="../assets/media/close.png"alt="close button"></button>
                  <img src="https://scolarcardiff.files.wordpress.com/2012/06/scan0013.jpg" alt="book pic" />
                  <div class="info">
                      <h1>${book.name}</h1>
                      <h3>Aвтор: ${book.author}</h3>
                      <h3>Количество страниц: ${book.pagesNumber}</h3>
                      <h4>Издательство: ${book.publishHouse}<span>${book.publishYear}</span></h4>
                      <h4>Язык: ${book.originalLanguage}</h4>
                  </div>
              </div>`;
          overlayInner.insertAdjacentHTML("beforeend", renderBook);
          closeBtn = document.getElementById("details-close");
          closeBtn.addEventListener("click", () => {
            detailsContainer.style.display = "none";
            overlayInner.innerHTML = "";
          });
        });
      });
    }

    //edit logic
    async function editHandler() {
      editIcon.forEach((item) => {
        item.addEventListener("click", async () => {
          modalOutter.style.display = "flex";
          addButton.classList.add("disabled");
          editSaveButton.classList.remove("disabled");
          const bookId = item.closest(".card").id;
          let book = await getOneBook(bookId);
          addNameInput.value = book.name;
          addAuthorInput.value = book.author;
          yearInput.value = book.publishYear;
          houseInput.value = book.publishHouse;
          pagesInput.value = book.pagesNumber;
          editId.value = bookId;
          genreInput.forEach((item) => {
            if (book.genres.has(item.value)) {
              item.setAttribute("checked", "checked");
            }
          });
          languageInput.value = book.originalLanguage;
        });
      });
    }
    async function saveUpdate() {
      editSaveButton.addEventListener("click", async (e) => {
        e.preventDefault();
        addNameInput.addEventListener("input", bookNameValidation);
        addAuthorInput.addEventListener("input", bookAuthorValidation);
        addInputs.forEach((item) => {
          item.addEventListener("input", addInputsValidation);
        });
        modalValidation();
        if (addNameInput.value && addAuthorInput.value) {
          genreInput.forEach((item, i) => {
            if (genreInput[i].checked) {
              checkedArray.push(genreInput[i].value);
            }
          });
          let editedBook = {
            name: addNameInput.value,
            author: addAuthorInput.value,
            isFavorite: false,
            publishYear: +yearInput.value,
            publishHouse: houseInput.value,
            pagesNumber: +pagesInput.value,
            genres: checkedArray,
            originalLanguage: languageInput.value,
          };
          addNameInput.removeEventListener("input", bookNameValidation);
          addAuthorInput.removeEventListener("input", bookAuthorValidation);
          addInputs.forEach((item) => {
            item.removeEventListener("input", addInputsValidation);
          });
          removeAddSpans();
          const bookId = editId.value;
          let data = await updateBook(bookId, editedBook);
          render();
          if (data) {
            setTimeout(() => {
              modalOutter.style.display = "none";
              addInputs.forEach((item) => {
                item.value = "";
              });
            }, 800);
          }
        }
      });
    }

    //favorites logic
    async function heartPress() {
      heartIcon.forEach((item) => {
        item.addEventListener("click", async () => {
          const bookId = item.closest(".card").id;
          let book = await getOneBook(bookId);

          book.isFavorite = !book.isFavorite;
          book.genres = Array.from(book.genres);
          delete book.id;
          await updateBook(bookId, book);
          render();
        });
      });
    }

    const render = async () => {
      await mapBooks();
      await heartPress();
      await infoHandler();
      await editHandler();
      await saveUpdate();
    };
    render();

    //add function
    addButton.addEventListener("click", async (e) => {
      e.preventDefault();
      addNameInput.addEventListener("input", bookNameValidation);
      addAuthorInput.addEventListener("input", bookAuthorValidation);
      addInputs.forEach((item) => {
        item.addEventListener("input", addInputsValidation);
      });
      modalValidation();
      if (addNameInput.value && addAuthorInput.value) {
        addInputs.forEach((item, i) => {
          if (addInputs[i].checked) {
            checkedArray.push(addInputs[i].value);
          }
          newBook = {
            name: `${addInputs[0].value}`,
            author: `${addInputs[1].value}`,
            isFavorite: false,
            publishYear: +addInputs[2].value,
            publishHouse: `${addInputs[3].value}`,
            pagesNumber: +addInputs[4].value,
            genres: checkedArray,
            originalLanguage: `${addInputs[10].value}`,
          };
        });
        addNameInput.removeEventListener("input", bookNameValidation);
        addAuthorInput.removeEventListener("input", bookAuthorValidation);
        addInputs.forEach((item) => {
          item.removeEventListener("input", addInputsValidation);
        });

        removeAddSpans();

        let data = await addBook(newBook);
        if (data) {
          mapBooks();
          setTimeout(() => {
            modalOutter.style.display = "none";
            checkedArray = [];
          }, 1000);
        }
      }
    });
  };

  //relocate
  blankHeart.addEventListener("click", () => {
    window.location.assign("favorites.html");
  });

  //relocate
  redHeart.addEventListener("click", () => {
    window.location.assign("favorites.html");
  });
} else {
  if (
    !JSON.parse(localStorage.getItem("user")) &&
    window.location.pathname !== "/index.html"
  ) {
    window.location.replace("/index.html");
  }
}
