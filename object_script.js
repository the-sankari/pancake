class CakeOrderForm {
  constructor(
    formSelector,
    typeSelector,
    totalPriceSelector,
    checkboxesSelector,
    orderButtonSelector
  ) {
    this.form = document.querySelector(formSelector);
    this.cakeType = document.querySelector(typeSelector);
    this.totalPriceElement = document.querySelector(totalPriceSelector);
    this.checkBoxes = document.querySelectorAll(checkboxesSelector);
    this.makeOrderButton = document.querySelector(orderButtonSelector);


    
    this.total = 0;
    this.toppings = [];
    this.extras = [];

    this.calculatePrice = () => {
      this.total = parseInt(this.cakeType.value);
      this.checkItems();
      this.totalPriceElement.textContent = `€${this.total}`;
    };

    this.addItem = (itemName, itemCategory) => {
      if (itemCategory === "toppings") {
        this.toppings.push(itemName);
      } else {
        this.extras.push(itemName);
      }
    };

    this.checkItems = () => {
      this.toppings = [];
      this.extras = [];

      for (const item of this.checkBoxes) {
        let itemName = item.dataset.name;
        let itemCategory = item.dataset.category;

        if (item.checked) {
          this.total += parseInt(item.value);
          this.addItem(itemName, itemCategory);
        }
      }

      console.log(`Toppings: ${this.toppings}`);
      console.log(`Extras: ${this.extras}`);
    };

    this.init = () => {
      this.form.addEventListener("change", () => this.calculatePrice());
      this.makeOrderButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.displayOrder();
      });
    };

    this.displayOrder = () => {
      const orderDetails = document.querySelector(".display");
      const customerNameInput = document.querySelector("#customer-name");
      const orderName = document.querySelector("#order-name");
      const orderType = document.querySelector("#order-type");
      const orderToppings = document.querySelector("#order-toppings");
      const orderExtras = document.querySelector("#order-extras");
      const orderTotal = document.querySelector("#order-total");

      orderName.textContent = customerNameInput.value;
      orderType.textContent =
        this.cakeType.options[this.cakeType.selectedIndex].text;
      orderToppings.textContent = this.toppings.join(", ");
      orderExtras.textContent = this.extras.join(", ");
      orderTotal.textContent = `€${this.total}`;
      orderDetails.style.display = "block";
      document.querySelector(".main-container").style.opacity = 0.5;
    };
  }
}

const cakeOrderForm1 = new CakeOrderForm(
  "form",
  "#type",
  "#totalPrice",
  'input[type="checkbox"]',
  "#place-order"
);

cakeOrderForm1.init();

