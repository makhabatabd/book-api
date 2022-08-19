import { getMe } from "./api";
if (
  window.location.pathname.endsWith("/favorites.html") ||
  window.location.pathname.endsWith("/list.html") ||
  window.location.href.indexOf("search.html") != -1
) {
  const profile = document.querySelector(".user-profile");
  const userModal = document.querySelector(".user-modal");
  const userName = document.querySelector(".user-name");
  const userAge = document.querySelector(".user-age");
  profile.addEventListener("click", async () => {
    userModal.style.display = "inline-block";
    let userProfile = await getMe();
    userName.innerText = `${userProfile.username}`;
    userAge.innerText = `${userProfile.age}`;

    setTimeout(() => {
      userModal.style.display = "none";
    }, 4000);
  });
}
