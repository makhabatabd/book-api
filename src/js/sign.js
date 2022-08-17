import { LogInData } from "./api";
import { registerData } from "./api";
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const logInButton = document.getElementById("logIn");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const usernameSpan = document.querySelector(".username__span");
const ageInput = document.getElementById("age");
const ageSpan = document.querySelector(".age__span");
const passwordInput = document.getElementById("password");
const passwordSpan = document.querySelector(".password__span");
const registerButton = document.getElementById("register");
const logInUser = document.getElementById("log-in__user");
const logInPassword = document.getElementById("log-in__password");
const logInUserSpan = document.getElementById("log-in__user_span");
const logInPasswordSpan = document.getElementById("log-in__password_span");

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let newUser = {
  firstName: "",
  username: "",
  password: "",
  age: "",
};

const signUpValidation = () => {
  if (usernameInput.value.length === 0) {
    usernameSpan.innerText = "Please, write your username!";
  }
  if (!passwordInput.value.match(passwordRegex)) {
    passwordSpan.innerText =
      "8 characters, one UpperCase, one LowerCase and 1 or more digits and a symbol!";
  }
  if (ageInput.value && ageInput.value < 18) {
    ageSpan.innerText = "You are underage for this website!";
  }
};

function usernameValidation() {
  usernameInput.value.length === 0
    ? (usernameSpan.innerText = "Please, write your username!")
    : (usernameSpan.innerText = "");
}

function passwordValidation() {
  !passwordInput.value.match(passwordRegex)
    ? (passwordSpan.innerText =
        "8 characters, one UpperCase, one LowerCase and 1 or more digits and a symbol!")
    : (passwordSpan.innerText = "");
}

function ageValidation() {
  if (ageInput.value && ageInput.value < 18) {
    ageSpan.innerText = "You are underage for this website!";
  } else {
    ageSpan.innerText = "";
  }
}

const removeSpans = () => {
  usernameSpan.innerText = "";
  ageSpan.innerText = "";
  passwordSpan.innerText = "";
};

registerButton.addEventListener("click", async () => {
  usernameInput.addEventListener("input", usernameValidation);
  passwordInput.addEventListener("input", passwordValidation);
  ageInput.addEventListener("input", ageValidation);
  signUpValidation();
  if (
    usernameInput.value.length > 0 &&
    passwordInput.value.match(passwordRegex)
  ) {
    newUser = {
      firstName: nameInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
      age: ageInput.value,
    };
    usernameInput.removeEventListener("input", usernameValidation);
    passwordInput.removeEventListener("input", passwordValidation);
    ageInput.removeEventListener("input", ageValidation);
    removeSpans();
    let data = await registerData(newUser);
    console.log(data);
    if (data) {
      localStorage.setItem("newUser", JSON.stringify(data));
      nameInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";
      ageInput.value = "";
      window.location.assign("list.html");
    }
  }
});

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

let logUser = {
  username: "",
  password: "",
};

const logInValidation = () => {
  if (logInUser.value.length === 0) {
    logInUserSpan.innerText = "Please input your username";
  }
  if (!logInPassword.value.match(passwordRegex)) {
    logInPasswordSpan.innerText =
      "Please follow the rules in password as you did when registering";
  }
};

function logInUserValidation() {
  logInUser.value.length === 0
    ? (logInUserSpan.innerText = "Please input your username")
    : (logInUserSpan.innerText = "");
}

function logInPasswordValidation() {
  logInPassword.value.length === 0
    ? (logInPasswordSpan.innerText = "Please input your username")
    : (logInPasswordSpan.innerText = "");
}

const removeLogInSpans = () => {
  logInPasswordSpan.innerText = "";
  logInUserSpan.innerText = "";
};

logInButton.addEventListener("click", async () => {
  logInUser.addEventListener("input", logInUserValidation);
  logInPassword.addEventListener("click", logInPasswordValidation);
  logInValidation();
  if (logInUser && logInPassword.value.match(passwordRegex)) {
    logUser = {
      username: logInUser.value,
      password: logInPassword.value,
    };
    logInUser.removeEventListener("input", logInUserValidation);
    logInPassword.removeEventListener("click", logInPasswordValidation);
    removeLogInSpans();
    let data = await LogInData(logUser);
    console.log(data);
    if (data) {
      localStorage.setItem("oldUser", JSON.stringify(data));
      logInUser.value = "";
      logInPassword.value = "";
      window.location.assign("list.html");
    }
  }
});
