let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxs = document.querySelector(".taxs");
let ads = document.querySelector(".ads");
let discound = document.querySelector(".discound");
let total = document.querySelector(".total");
let category = document.querySelector(".category");
let count = document.querySelector(".count");
let toggoler = document.querySelector(".toggoler");
let toggolerI = document.querySelector(".toggoler i");
let submit = document.querySelector(".submit");

// Create Mood To  This App
let mood = "create";

// Create Variable Global
let x;

// Toggoler Button Dark Theme And Light Theme
function toggolerAction() {
  if (toggolerI.classList.contains("bx-moon")) {
    toggolerI.classList.remove("bx-moon");
    toggolerI.classList.add("bx-sun");
  } else {
    toggolerI.classList.add("bx-moon");
    toggolerI.classList.remove("bx-sun");
  }
  document.body.classList.toggle("dark");
  document.querySelector(".app").classList.toggle("dark");
}

// Function To Claculate Price And Taxs And Ads And Discound
function calcTotal() {
  if (price.value === "0" || isNaN(price.value)) {
    total.innerHTML = 0;
  } else {
    total.innerHTML = +price.value + +taxs.value + +ads.value - +discound.value;
  }
  totalChange();
}

// Function To Create Product When Onclick Create Button
let productsArray = [];

if (localStorage.getItem("product")) {
  productsArray = JSON.parse(localStorage.getItem("product"));
}

function create() {
  const products = {
    name: title.value,
    price: price.value,
    taxs: taxs.value,
    ads: ads.value,
    discound: discound.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (!Array.isArray(productsArray)) {
    productsArray = [];
  }

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 1000
  ) {
    if (mood === "create") {
      if (products.count > 1) {
        for (let i = 0; i < products.count; i++) {
          productsArray.push(products);
        }
      } else {
        productsArray.push(products);
      }
    } else {
      productsArray[x] = products;
      submit.textContent = "Create";
      count.style.display = "block";
      mood = "create";
    }
    calcTotal();
    total.style.backgroundColor = "#f44336";
    clearInputs();
  } else {
    console.log("Bug");
  }
  localStorage.setItem("product", JSON.stringify(productsArray));
  read();
}

// Function Clear Inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxs.value = "";
  ads.value = "";
  discound.value = "";
  total.innerHTML = 0;
  count.value = "";
  category.value = "";
}

// Function To Total To Change Color
function totalChange() {
  if (price.value > 0) {
    total.style.backgroundColor = "#0075ff";
  } else {
    total.style.backgroundColor = "#f44336";
  }
}

// Function Read Data From Array To Table
function read() {
  let table = "";
  for (let i = 0; i < productsArray.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${productsArray[i].name}</td>
      <td>${productsArray[i].price}</td>
      <td>${productsArray[i].taxs}</td>
      <td>${productsArray[i].ads}</td>
      <td>${productsArray[i].discound}</td>
      <td>${productsArray[i].total}</td>
      <td>${productsArray[i].category}</td>
      <td><button onclick="updateData(${i})" class="update">update</button></td>
      <td><button onclick="delProduct(${i})" class="delete">delete</button></td>
    </tr>`;
  }
  document.getElementById("product-table").innerHTML = table;
  if (productsArray.length > 0) {
    document.getElementById("deleteAll").style.display = "block";
    deleteAllBtn();
  } else {
    document.getElementById("deleteAll").style.display = "none";
  }
}
read();

// Function Delete Product
function delProduct(i) {
  productsArray.splice(i, 1);
  localStorage.product = JSON.stringify(productsArray);
  read();
}

// Function Delete All Products
function deleteAllBtn() {
  let deleteBtn = document.getElementById("deleteAll");
  deleteBtn.innerHTML = `
    <button onclick="deleteAllPro()">Delete All (${productsArray.length})</button>
  `;
}
function deleteAllPro() {
  localStorage.clear();
  productsArray.splice(0);
  read();
}

// Function Update Data
function updateData(i) {
  title.value = productsArray[i].name;
  price.value = productsArray[i].price;
  taxs.value = productsArray[i].taxs;
  ads.value = productsArray[i].ads;
  discound.value = productsArray[i].discound;
  category.value = productsArray[i].category;
  calcTotal();
  count.style.display = "none";
  submit.textContent = "Upload";
  mood = "upload";
  x = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Function Search Data
let searchMood = "title";

function searchBy(id) {
  let search = document.querySelector(".search");
  if (id === "searchByName") {
    searchMood = "title";
    search.placeholder = "Search By Name";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  read();
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < productsArray.length; i++) {
      if (productsArray[i].name.toLowerCase().includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${productsArray[i].name}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].taxs}</td>
            <td>${productsArray[i].ads}</td>
            <td>${productsArray[i].discound}</td>
            <td>${productsArray[i].total}</td>
            <td>${productsArray[i].category}</td>
            <td><button onclick="updateData(${i})" class="update">update</button></td>
            <td><button onclick="delProduct(${i})" class="delete">delete</button></td>
          </tr>`;
      }
    }
  } else {
    for (let i = 0; i < productsArray.length; i++) {
      if (
        productsArray[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${productsArray[i].name}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].taxs}</td>
            <td>${productsArray[i].ads}</td>
            <td>${productsArray[i].discound}</td>
            <td>${productsArray[i].total}</td>
            <td>${productsArray[i].category}</td>
            <td><button onclick="updateData(${i})" class="update">update</button></td>
            <td><button onclick="delProduct(${i})" class="delete">delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById("product-table").innerHTML = table;
}
