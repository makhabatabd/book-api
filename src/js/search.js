import { getBooks } from "./api";
if (window.location.href.indexOf("search.html") != -1) {
  const searchOutter = document.querySelector(".search-outter");
  const homeIcon = document.querySelector(".home-page");
  const logOut = document.querySelector(".log-out");
  let noBooksTitle = document.querySelector("#no-search");
  let path = decodeURIComponent(window.location.href);
  let value = path.split("?");
  window.onload = async () => {
    async function searchBooks() {
      searchOutter.innerHTML = "";
      noBooksTitle.innerText = "";
      let books = await getBooks();
      let count = 0;
      books.map((book) => {
        if (value[1] === book.name.toLowerCase().replace(/\s/g, "")) {
          let bookList = ` <div class="card" id=${book.id}>
                            <img src="https://scolarcardiff.files.wordpress.com/2012/06/scan0013.jpg" alt="book pic" />
                            <div class="bottom">
                                <h3 class="title">${book.name}</h3>
                                <p id="search-author" class="author">${book.author}</p>
                            </div>
                        </div>
                      `;
          searchOutter.insertAdjacentHTML("beforeend", bookList);
          count = count + 1;
        }
      });
      if (count === 0) {
        noBooksTitle.innerText = "No books found";
      }
    }
    searchBooks();
    homeIcon.addEventListener("click", () => {
      window.location.assign("list.html");
    });

    logOut.addEventListener("click", () => {
      window.localStorage.clear();
      window.location.assign("index.html");
    });
  };
}
