if (window.location.pathname.endsWith("/list.html")) {
  const logOut = document.querySelector(".log-out");

  logOut.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.assign("index.html");
  });
}
