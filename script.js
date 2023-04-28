menu = document.querySelector("#menu");
navigation_bar = document.querySelector(".navigation_bar");

function cart() {
  const nav = document.querySelector(".navigation_bar");
  nav.classList.toggle("active");
}
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting
  const searchInput = document.querySelector("#search");
  const productName = searchInput.value.toLowerCase(); // convert to lowercase for case-insensitive comparison
  const products = document.querySelectorAll(".product-item");
  let product;

  products.forEach((item) => {
    const itemProductName = item.getAttribute("data-product").toLowerCase(); // get the value of dataproduct attribute and convert to lowercase
    if (itemProductName === productName) {
      product = item;
    }
  });

  if (product) {
    // scroll to the product
    product.scrollIntoView({ behavior: "smooth" });
  } else {
    alert(`Product "${productName}" not found.`);
  }
});

// CART FUNCTIONS

const cartIcon = document.querySelector("#cart_icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', ()=>{
  cart.classList.add('act');
});
closeCart.addEventListener('click', ()=>{
  cart.classList.remove('act');
});

// Start when the document is ready
if (document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

function start() {
  addEvents();
}

  // UPDATE & RERENDER
function update() {
  addEvents();
  updateTotal();
}
  // ADD EVENTS 
function addEvents() {

  // Remove items from cart
  let cartRemove_btns = document .querySelectorAll(".cart-remove"); 
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeltemQuantity);
  });
  
  //Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });
  
  // Buy Order
  const buy_btn = document.querySelector(".btn-buy"); 
  buy_btn.addEventListener("click", handle_buyOrder);
}
 
// HANDLE EVENTS FUNCTIONS
let itemsAdded = []

function handle_addCartItem() {
let product = this.parentElement;
let title = product.querySelector(".product-brand").innerHTML;
let price = product.querySelector(".product-price").innerHTML;
let imgSrc = product.querySelector(".product-image").src;
console.log(title, price, imgSrc);

let newToAdd = {
  title,
  price,
  imgSrc,
};

// Handle item if already exist
if(itemsAdded.find((el) => el.title == newToAdd.title)) {
  alert("This item is already in the cart!");
  return;
}
else {
  itemsAdded.push(newToAdd);
 }

// Add product to cart
let cartBoxElement = CartBoxComponent(title, price, imgSrc);
let newNode = document.createElement("div");
newNode.innerHTML = cartBoxElement;
const cartContent = cart.querySelector(".cart-content");
cartContent.appendChild(newNode);

update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el)=> 
    el.title != 
    this.parentElement.querySelector(".cart-product-title").innerHTML);

update();
}

function handle_buyOrder(){
  if (itemsAdded.length <= 0) {
    alert ("There is no order to place yet! \nPlease Make an Order first.");
    return;
  }
  
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert ("Your Order is Placed Successfully :)");
  itemsAdded = [];
  
  update();
}

// UPDATE & RERENDER FUNCTIONS
function updateTotal () {
  let cartBoxes = document.querySelectorAll(".cart-box"); 
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price"); 
    let price = parseFloat(priceElement.innerHTML.replace("$",  ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

// keep 2 digits after the decimal point
total = total.toFixed(2);

totalElement.innerHTML = "$" + total;
}

function handle_changeltemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer 
  
  update();
  }



  // ========= HTML COMPONENTS
 function CartBoxComponent (title, price, imgSrc) {
  return `
  <div class="cart-box">
<img src=${imgSrc}= alt="" class="cart-img">
<div class="detail-box">
<div class="cart-product-title">${title}</div> 
<div class="cart-price">${price}</div>
<input type="number" value="1" class="cart-quantity">
</div>
<!-- REMOVE CART -->
<img src="pictures/delete-bin-5-line.svg" alt="delete" class="cart-remove">
</div>`;
}

