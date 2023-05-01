menu = document.querySelector("#menu");
navigation_bar = document.querySelector(".navigation_bar");

function menuBox() {
  const nav = document.querySelector(".navigation_bar");
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // Get necessary elements from the HTML
  const basket = document.querySelector(".basket");
  const cart = document.querySelector("#cart");
  const closeCartBtn = document.querySelector("#cart-close");

  // Add click event listener to basket
  basket.addEventListener("click", () => {
    // Show the cart
    cart.classList.add("act");
  });

  // Add click event listener to close cart button
  closeCartBtn.addEventListener("click", () => {
    // Hide the cart
    cart.classList.remove("act");
  });



  let itemsAdded = [];

// UPDATE & RERENDER
function update() {
  addEvents();
  updateTotal();
}

// ADD EVENTS
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  //Add item to cart
  let addCart_btns = document.querySelectorAll(".product-action");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// HANDLE EVENTS FUNCTIONS

function handle_addCartItem() {
  let product = this.parentElement.parentElement;
  let title = product.querySelector(".product-brand").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-image").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price: parseFloat(price.replace("$", "")),
    imgSrc,
    quantity: 1
  };

  // Handle item if already exist
  let existingItem = itemsAdded.find((el) => el.title == newToAdd.title);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.classList.add("cart-box");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  const cartItem = this.parentElement;
  const title = cartItem
    .querySelector(".cart-product-title")
    .textContent.trim();
  cartItem.remove();
  let itemToRemoveIndex = itemsAdded.findIndex((item) => item.title === title);
  if (itemToRemoveIndex !== -1) {
    itemsAdded.splice(itemToRemoveIndex, 1);
  }
  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There are no items in the cart!");
    return;
  }

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your order has been placed successfully!");
  itemsAdded = [];

  update();
}

function handle_changeItemQuantity() {
  let newQuantity = parseInt(this.value);
  if (isNaN(newQuantity) || newQuantity < 1) {
    newQuantity = 1;
  }
  let title = this.parentElement.querySelector(".cart-product-title").textContent.trim();
  let itemToUpdate = itemsAdded.find((item) => item.title === title);
  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
    update();
  }
}

// UPDATE & RERENDER FUNCTIONS
function updateTotal() {
  let total = 0;
  itemsAdded.forEach((item) => {
    total += item.price * item.quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);

  const totalElement = cart.querySelector(".total-price");
  totalElement.innerHTML = "$" + total;
}

// HTML COMPONENT
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class='cart-box'>
      <img src=${imgSrc} alt='' class='cart-img'>
      <div class='detail-box'>
        <div class='cart-product-title'>${title}</div> 
        <div class='cart-price'>${price}</div>
        <input type='number' value='1' class='cart-quantity'>
      </div>
      <!-- REMOVE CART -->
      <img src='pictures/delete-bin-5-line.svg' alt='delete' class='cart-remove'>
    </div>
  `;
}
});
