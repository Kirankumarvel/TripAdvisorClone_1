let user = localStorage.getItem("tripUser");

const div = document.querySelector("#signIn");
// console.log(div)
if (user) {
  div.innerText = "";
  const btn = document.createElement("button");
  btn.innerText = "Log Out";
  btn.addEventListener("click", logoutUser);
  btn.setAttribute("id", "signin");
  div.append(btn);
}

function logoutUser() {
  localStorage.removeItem("tripUser");
  location = "index.html";
}
