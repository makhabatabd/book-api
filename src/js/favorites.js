import { getBooks } from "./api";
import { getOneBook } from "./api";
import { updateBook } from "./api";
if (window.location.pathname.endsWith("/favorites.html")) {
  const favoritesOutter = document.querySelector(".favorites-outter");
  const title = document.querySelector("#no-favorites");
  window.onload = async () => {
    let trashIcon;
    async function mapFavorites() {
      let books = await getBooks();
      favoritesOutter.innerHTML = "";
      title.innerText = "";
      let count = 0;
      books.map((book) => {
        if (book.isFavorite === true) {
          let bookList = ` <div class="card" id=${book.id}>
                    <img src="https://scolarcardiff.files.wordpress.com/2012/06/scan0013.jpg" alt="book pic" />
                    <div class="bottom">
                        <h3 class="title">${book.name}</h3>
                        <p class="author">${book.author}</p>
                    </div>
                    <svg id="fav-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                </div>
              `;
          favoritesOutter.insertAdjacentHTML("beforeend", bookList);
          count = count + 1;
        } else if (count === 0) {
          title.innerText = "No favorite books!";
        }
      });
    }
    async function deleteFav() {
      trashIcon = document.querySelectorAll("#fav-trash");
      trashIcon.forEach((item) => {
        console.log(item);
        item.addEventListener("click", async () => {
          console.log("click");
          const bookId = item.closest(".card").id;
          let book = await getOneBook(bookId);
          console.log(book);

          book.isFavorite = !book.isFavorite;
          book.genres = Array.from(book.genres);
          delete book.id;
          await updateBook(bookId, book);
          await render();
        });
      });
    }

    const render = async () => {
      await mapFavorites();
      await deleteFav();
    };
    render();
  };
}
