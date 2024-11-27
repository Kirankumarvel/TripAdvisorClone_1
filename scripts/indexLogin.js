let user = localStorage.getItem("tripUser");

const div = document.querySelector(".list>ul>a");

// console.log(div)
if (user) {
  div.innerText = "";
  const btn = document.createElement("button");
  btn.innerText = "Log Out";
  btn.addEventListener("click", logoutUser);
  btn.setAttribute("id", "btn");

  div.append(btn);
  div.removeAttribute("href");
}

document.querySelector("body").addEventListener("click",checkVisibilty)
// document.querySelector("#hotel").addEventListener("click",askForlocation)
// document.querySelector("#restaurant").addEventListener("click",askForlocation)
// document.querySelector("#optionBar").addEventListener("click",openList)
let visibility = "none"
let page = "hotel"

function logoutUser() {
  localStorage.removeItem("tripUser");
  location = "index.html";
}

function checkVisibilty(e){
  const list = document.querySelector("#optionList")
  const tar = e.target.id 
  console.log(tar,tar==="optionVal")
  if(tar==="hotel" || tar==="restaurant" || tar==="optionBar"){
    if((tar==="hotel" || tar==="restaurant")){
      page = tar
      if(visibility==="none"){
        visibility = "block"
        list.style.display = visibility
      }
    }
    else if(tar==="optionBar"){
      console.log(2)
      if(visibility==="none"){
        visibility = "block"
      }
      else{
        visibility = "none"
      }
      list.style.display = visibility
    }
  } 
  else if(tar==="optionVal"){
    if(page==="hotel"){
      localStorage.setItem('hotel',e.target.innerText)
      location = "hotel.html"
    }
    else if(page=="restaurant"){
      // console.log("Shakti bhai Complete hua???")
      localStorage.setItem('restaurant',e.target.innerText)
      location = "showPage.html"
    }
  }
  else{
    // console.log(3)
    visibility = "none"
    list.style.display = visibility
  }
}