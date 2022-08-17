const mistake = document.getElementById("error");
const logInMistake = document.getElementById("log-in__error");

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
