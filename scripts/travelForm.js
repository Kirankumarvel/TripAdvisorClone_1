const form = document.querySelector("#formSearch > form");
form.addEventListener("submit", checkFlights);

const booking = document.querySelector("#typeOfTravel");

booking.addEventListener("click", handleOneWayClick);

var formHeadingType = "oneWay";
document.getElementById("oneWay").style.borderBottom = "2px solid white";

document.getElementById("from").addEventListener("input", handleFrom);

document.getElementById("to").addEventListener("input", handleTo);

// document.getElementById("navbar").load("nav.html")

function handleTo(e) {
  let to = e.target;
  let val = to.value;
  if (val.length === 4) {
    to.value = "";
  } else if (val.length === 1) {
    to.value = `To: ${val}`;
  } else {
    to.value = `To: ${val.substr(4)}`;
  }
}

function handleFrom(e) {
  let from = e.target;
  let val = from.value;
  if (val.length === 6) {
    from.value = "";
  } else if (val.length === 1) {
    from.value = `From: ${val}`;
  } else {
    from.value = `From: ${val.substr(6)}`;
  }
}

function handleOneWayClick(e) {
  formHeadingType = e.target.getAttribute("value");
  console.log(formHeadingType);
  if (formHeadingType === "oneWay") {
    document.getElementById("oneWay").style.borderBottom = "2px solid white";
    document.getElementById("roundTrip").style.borderBottom = "none";
  } else {
    document.getElementById("oneWay").style.borderBottom = "none";
    document.getElementById("roundTrip").style.borderBottom = "2px solid white";
  }
  returnInput();
}
// console.log(form1,"form1")
// console.log(booking)
setToday();
function setToday() {
  const departDate = document.querySelector("#depart");
  var today = new Date();
  depart.value = today.toISOString().substr(0, 10);
}

function checkFlights() {
  event.preventDefault();
  const type = booking;
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");
  const depart = document.querySelector("#depart");
  const noOfPassengers = document.querySelector("#noOftravellers");
  const nonStop = document.querySelector("#nonStop").checked;

  if (from.value === "") {
    console.log("from");
    // from.setAttribute("class","highLight")
  } else if (to.value === "") {
    console.log("to");
    // from.setAttribute("class","highLight")
  } else if (noOfPassengers.value === "" || noOfPassengers === 0) {
    console.log("noOfPassengers");
    // from.setAttribute("class","highLight")
  } else {
    console.log(nonStop, from.value.substr(6), to.value.substr(4));
    const search = {
      from: from.value.substr(6),
      to: to.value.substr(4),
      depart: depart.value,
      returnTrip: formHeadingType === "roundTrip" ? true : false,
      type: formHeadingType,
      noOfPassengers: noOfPassengers.value,
      nonStop: nonStop,
    };
    localStorage.setItem("search", JSON.stringify(search));
    location = "flightResult.html";
  }
}

function returnInput() {
  // console.log(val)
  const div = document.querySelector("#returnBox");
  if (formHeadingType === "roundTrip") {
    const returnDate = document.createElement("input");
    // console.log(returnDate)
    returnDate.setAttribute("type", "date");
    returnDate.setAttribute("id", "returnDate");
    let date = new Date();
    date.setDate(date.getDate() + 10);
    returnDate.value = date.toISOString().substr(0, 10);

    const currDiv = document.createElement("div");
    currDiv.append(returnDate);

    div.setAttribute("class", "inputBox");
    div.append(currDiv);
  } else {
    div.innerText = "";
    div.removeAttribute("class");
  }
}
