const asciValue = {
  kolkata: 743,
  mumbai: 635,
  chennai: 726,
  delhi: 518,
  nonstop: 785,
  onestop: 776,
  oneplusstop: 1228,
  "Spice Jet": 823,
  "Indi Go": 602,
  "Air India": 801,
  "Air Asia": 698,
  "Go Air": 498,
  Vistara: 730,
};

const icons = {
  "Spice Jet":
    "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spicejet.png",
  "Go Air":
    "https://static.tacdn.com/img2/flights/airlines/logos/100x100/GoAir.png",
  "Indi Go":
    "https://static.tacdn.com/img2/flights/airlines/logos/100x100/IndiGoAirlines.png",
  "Air India":
    "https://static.tacdn.com/img2/flights/airlines/logos/100x100/AirIndia.png",
  "Air Asia":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/768px-AirAsia_New_Logo.svg.png",
  Vistara:
    "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vistara.png",
};

const form = document.querySelector("#search>button");
form.addEventListener("click", checkFlights);

const booking = document.querySelector("#typeOfTravelResult");
booking.addEventListener("click", handleOneWayClick);

booking.addEventListener("click", handleOneWayClick);

var formHeadingType = "oneWay";
document.getElementById("oneWay").style.borderBottom = "2px solid black";

function handleOneWayClick(e) {
  formHeadingType = e.target.getAttribute("value");
  console.log(formHeadingType);
  if (formHeadingType === "oneWay") {
    document.getElementById("oneWay").style.borderBottom = "2px solid black";
    document.getElementById("roundTrip").style.borderBottom = "none";
  } else {
    document.getElementById("oneWay").style.borderBottom = "none";
    document.getElementById("roundTrip").style.borderBottom = "2px solid black";
  }
  returnInput();
}

setToday();
displaySearch();
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
    // console.log(nonStop,from.value.substr(6),to.value.substr(4))
    const search = {
      from: from.value,
      to: to.value,
      depart: depart.value,
      returnTrip: formHeadingType === "roundTrip" ? true : false,
      type: formHeadingType,
      noOfPassengers: noOfPassengers.value,
    };
    localStorage.setItem("search", JSON.stringify(search));
    location = "flightResult.html";
  }
}

function returnInput() {
  const div = document.querySelector("#return");
  if (formHeadingType === "roundTrip") {
    // console.log("abcd")
    // const fav = document.createElement("i")
    // fav.className = "fa-solid fa-calendar-days"

    // const p = document.createElement("p")
    // p.append(fav)

    // const div1 = document.createElement("div")
    // div1.append(p)
    // console.log(div1)

    const label = document.createElement("label");
    label.innerText = "Return";

    const br = document.createElement("br");

    const returnDate = document.createElement("input");
    returnDate.setAttribute("type", "date");
    let date = new Date();
    date.setDate(date.getDate() + 10);
    returnDate.value = date.toISOString().substr(0, 10);

    const div2 = document.createElement("div");
    div.append(label, br, returnDate);

    div.setAttribute("class", "InputBox");
    div.append(div2);
  } else {
    div.innerText = "";
    div.removeAttribute("class");
  }
}

function displaySearch() {
  const search = JSON.parse(localStorage.getItem("search"));
  console.log(search);
  const data = JSON.parse(localStorage.getItem("data"));
  // console.log(search.nonStop,"nonStop")
  let data1 =
    data[search.from.toLowerCase()]["Travel"][search.to.toLowerCase()][
      "non_stop"
    ];
  if (!search.nonStop) {
    console.log("inside");
    data1 = data1.concat(
      data[search.from.toLowerCase()]["Travel"][search.to.toLowerCase()][
        "one_stop"
      ],
      data[search.from.toLowerCase()]["Travel"][search.to.toLowerCase()][
        "one_plus_stop"
      ]
    );
  }
  console.log(data1, "data1", !search.nonStop);

  const div = document.querySelector("#midleDataDiv");
  if (search.type === "roundTrip") {
    console.log("hihih");
    let data2 =
      data[search.to.toLowerCase()]["Travel"][search.from.toLowerCase()][
        "non_stop"
      ];
    if (!search.nonStop) {
      data2 = data2.concat(
        data[search.to.toLowerCase()]["Travel"][search.from.toLowerCase()][
          "one_stop"
        ],
        data[search.to.toLowerCase()]["Travel"][search.from.toLowerCase()][
          "one_plus_stop"
        ]
      );
    }
    console.log(data2, "data2");
    data1.forEach((element, index) => {
      data2.forEach((element2, index2) => {
        const img1 = document.createElement("img");
        img1.setAttribute("src", icons[element.company]);
        img1.setAttribute("alt", element.company);
        img1.setAttribute("class", "flightImage");

        const h4 = document.createElement("h4");
        h4.innerText = `${element.departure}-${element.arrival}`;

        const p = document.createElement("p");
        p.innerText = `${search.from}-${search.to}, ${element.company}`;

        const h4_p1 = document.createElement("div");
        h4_p1.append(h4, p);
        h4_p1.setAttribute("class", "time");

        const duration = document.createElement("h5");
        duration.innerText = `${calculateDuration(element)}`;
        duration.setAttribute("class", "duration");

        const div1 = document.createElement("div");
        div1.append(img1, h4_p1, duration);
        div1.setAttribute("class", "roundFligthDetails");

        const img2 = document.createElement("img");
        img2.setAttribute("src", icons[element2.company]);
        img2.setAttribute("alt", element2.company);
        img2.setAttribute("class", "flightImage");

        const h41 = document.createElement("h4");
        h41.innerText = `${element2.departure}-${element2.arrival}`;

        const p1 = document.createElement("p");
        p1.innerText = `${search.to}-${search.from}, ${element2.company}`;

        const h4_p2 = document.createElement("div");
        h4_p2.append(h41, p1);
        h4_p2.setAttribute("class", "time");

        const duration1 = document.createElement("h5");
        duration1.innerText = `${calculateDuration(element2)}`;
        duration1.setAttribute("class", "duration");

        const div2 = document.createElement("div");
        div2.append(img2, h4_p2, duration1);
        div2.setAttribute("class", "roundFligthDetails");

        const rdiv = document.createElement("div");
        rdiv.append(div1, div2);

        const h21 = document.createElement("h2");
        h21.innerText = `Rs.${
          calculatePrice(element2, search.from, search.to, index2) +
          calculatePrice(element, search.from, search.to, index)
        }`;

        const btn2 = document.createElement("button");
        btn2.innerText = "View Deal >";
        // btn2.setAttribute("href","payment.html")
        btn2.addEventListener("click", () => {
          location = "payment.html";
        });

        const h2_btn = document.createElement("div");
        h2_btn.append(h21, btn2);
        h2_btn.setAttribute("class", "roundPricebox");

        // div1.append(h21)
        // div2.append(btn2)

        const div3 = document.createElement("div");
        div3.append(rdiv, h2_btn);
        // div3.append(div1,div2)
        div3.setAttribute("class", "roundDetails");

        div.append(div3);
      });
    });
  } else {
    console.log("1212364");
    data1.forEach((element, index) => {
      const img1 = document.createElement("img");
      img1.setAttribute("src", icons[element.company]);
      img1.setAttribute("alt", element.company);
      img1.setAttribute("class", "flightImage");

      const h4 = document.createElement("h3");
      h4.innerText = `${element.departure}-${element.arrival}`;

      const p = document.createElement("p");
      p.innerText = `${search.from}-${search.to}, ${element.company}`;

      const h4_p1 = document.createElement("div");
      h4_p1.append(h4, p);
      h4_p1.setAttribute("class", "time");

      const duration = document.createElement("h5");
      duration.innerText = `${calculateDuration(element)}`;
      duration.setAttribute("class", "duration");

      const h2 = document.createElement("h2");
      h2.innerText = `Rs.${calculatePrice(
        element,
        search.from,
        search.to,
        index
      )}`;

      const btn2 = document.createElement("button");
      btn2.innerText = "View Deal >";
      // btn2.setAttribute("href","payment.html")
      btn2.addEventListener("click", () => {
        location = "payment.html";
      });

      const h2_btn = document.createElement("div");
      h2_btn.append(h2, btn2);
      h2_btn.setAttribute("class", "pricebox");

      const div2 = document.createElement("div");
      div2.append(img1, h4_p1, duration, h2_btn);
      div2.setAttribute("class", "fligthDetails");

      div.append(div2);
    });
  }
}

function calculatePrice(element, from, to, index) {
  let sum =
    asciValue[from.toLowerCase()] +
    asciValue[to.toLowerCase()] +
    asciValue[element.company];
  const stopVal =
    index < 18
      ? asciValue["nonstop"]
      : index < 36
      ? asciValue["onestop"] * 1.5
      : asciValue["oneplusstop"] * 2;
  sum += stopVal;
  // console.log(sum,ret)
  // console.log()
  return sum;
}

function calculateDuration(element) {
  const dtime = element.departure.split(":");
  const atime = element.arrival.split(":");
  const d = parseInt(dtime[0]) * 60 + parseInt(dtime[1]);
  const a = parseInt(atime[0]) * 60 + parseInt(atime[1]);
  const time = d > a ? 24 * 60 + a - d : a - d;
  const duration = `${Math.floor(time / 60)}h ${time % 60}m`;
  // console.log(duration)
  return duration;
}

