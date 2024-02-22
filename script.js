const form = document.querySelector("form");

const cakeType = document.querySelector("#type");

const totalPriceElement = document.querySelector("#totalPrice");

const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const makeOrderbutton = document.querySelector("#place-order");

let total;
let toppings = [];
let extras = [];

const calculatePrice = () => {
  total = parseInt(cakeType.value);
  checkItems();
  totalPriceElement.textContent = `€${total}`;
};

const addItem = (itemName, itemCategory) => {
  if (itemCategory === "toppings") {
    toppings.push(itemName);
  } else {
    extras.push(itemName);
  }
};

const checkItems = () => {
  toppings = [];
  extras = [];

  for (const item of checkBoxes) {
    let itemName = item.dataset.name;
    let itemCategory = item.dataset.category;

    if (item.checked) {
      total += parseInt(item.value);
      addItem(itemName, itemCategory);
    }
  }

  console.log(`Toppings:  ${toppings}`);
  console.log(`Extras: ${extras}`);
};

const displayOrder = () => {
  const customerNameInput = document.querySelector("#customer-name");
  const orderName = document.querySelector("#order-name");
  const orderType = document.querySelector("#order-type");
  const orderToppings = document.querySelector("#order-toppings");
  const orderExtras = document.querySelector("#order-extras");
  const orderTotal = document.querySelector("#order-total");

  orderName.textContent = customerNameInput.value;

  orderType.textContent = cakeType.options[cakeType.selectedIndex].text;

  orderToppings.textContent = toppings.join(', ');
  orderExtras.textContent = extras.join(', ');
  orderTotal.textContent = `€${total}`;
};

form.addEventListener("change", calculatePrice);

makeOrderbutton.addEventListener("click", (e) => {
  e.preventDefault();
  displayOrder();
});
