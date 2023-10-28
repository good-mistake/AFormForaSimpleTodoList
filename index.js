import { database } from "./dataBase.js";
const itemName = document.querySelector("#name");
const itemDesc = document.querySelector("#description");
const itemPrice = document.querySelector("#price");
const form = document.querySelector("#form");
const formContainer = document.querySelector(".formResult");
const search = document.querySelector("#search");
const searchResult = document.querySelector(".searchResult");
loadForm();
function clear() {
  itemName.value = "";
  itemDesc.value = "";
  itemPrice.value = "";
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("yay");
  const name = itemName.value;
  const description = itemDesc.value;
  const price = itemPrice.value;
  if (name && description && price && !isNaN(price)) {
    const addToDataBase = {
      id: database.length + 1,
      name,
      description,
      price,
    };
    database.push(addToDataBase);
    localStorage.removeItem("list");
    saveForm();
    formContainer.textContent = "Your form has been submited";
    formContainer.classList.remove("fail");
    formContainer.classList.add("success");
    clear();
    createElement();
  } else if (isNaN(price)) {
    formContainer.textContent = "Please Enter A number for price!!";
    formContainer.classList.remove("success");
    formContainer.classList.add("fail");
    clear();
  } else {
    console.log("Please Fill all the fields");
    formContainer.textContent = "Please fill all the fields!!";
    formContainer.classList.remove("success");
    formContainer.classList.add("fail");
    clear();
  }

  console.log(database);
});
function loadForm() {
  const loadData = localStorage.getItem("list");
  if (loadData) {
    database.length = 0;
    database.push(...JSON.parse(loadData));
  }
}
function saveForm() {
  localStorage.setItem("list", JSON.stringify(database));
}

function createElement(item) {
  database.forEach((element) => {
    const cardContainer = document.querySelector(".cardContainer");
    const card = document.createElement("div");
    const cardName = document.createElement("div");
    const cardPrice = document.createElement("div");
    const cardDesc = document.createElement("div");
    const googleSearch = document.createElement("div");
    card.classList.add("card");
    card.append(cardName);
    card.append(cardDesc);
    card.append(cardPrice);
    card.append(googleSearch);
    cardContainer.append(card);
    cardName.textContent = element.name;
    cardDesc.textContent = element.description;
    cardPrice.textContent = element.price;
    googleSearch.innerHTML = `<a
  href="https://www.google.com/search?q=${encodeURIComponent(element.name)}"
  target="_blank"
>
  Search for  ${element.name}
</a>`;
  });
}
search.addEventListener("input", (e) => {
  searchResult.classList.add("hide");
  searchResult.innerHTML = "";
  const userInput = e.target.value.toLowerCase();
  if (userInput > "") {
    database.forEach((element) => {
      if (element.name.toLowerCase().includes(userInput)) {
        const searchItem = document.createElement("div");
        searchItem.textContent = element.name;
        searchResult.append(searchItem);
        searchResult.classList.remove("hide");
      }
    });
  }
});
console.log(database);
createElement();
