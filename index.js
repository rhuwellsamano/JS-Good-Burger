document.addEventListener("DOMContentLoaded", () => {
  // started about 9:30am
const orderList = document.querySelector('#order-list')
const burgerMenu = document.querySelector('#burger-menu')
const customBurgerForm = document.querySelector('#custom-burger')
const orderDiv = document.querySelector('.order')

const BURGERS_URL = 'http://localhost:3000/burgers'

const getBurgersFetch = () => {
  fetch(BURGERS_URL)
  .then(res => res.json())
  .then(allBurgersData => showAllBurgersInBurgerMenu(allBurgersData))
}

const showAllBurgersInBurgerMenu = (allBurgersData) => {
  allBurgersData.forEach(showOneBurgerInBurgerMenu)
}

const showOneBurgerInBurgerMenu = (oneBurger) => {
  let id = oneBurger.id
  let name = oneBurger.name
  let description = oneBurger.description
  let imageURL = oneBurger.image

  burgerMenu.innerHTML += `
  <div class="burger grow grow:hover">
    <h3 class="burger_title">${name}</h3>
      <img src="${imageURL}">
      <p class="burger_description">
        ${description}
      </p>
      <button class="add-to-order-button" data-name="${name}">Add to Order</button>
      <button class="remove-item-button" data-id="${id}">Remove Item</button>
  </div>
  `
}

const addEventListenerToBurgerMenuToAddBurgerToOrder = () => {
  burgerMenu.addEventListener('click', addBurgerToOrder)
}

const addBurgerToOrder = (event) => {
  if(event.target.classList.contains('add-to-order-button')){

    let nameOfAddedBurger = event.target.dataset.name

    orderList.innerHTML += `
      <div class="card grow grow:hover"> <div class="card-container"> 🍔 <b>${nameOfAddedBurger}</b> <button class="remove-button">Remove</button></div></div>
    `
  }
}

const addEventListenerToOrderListForRemoveButton = () => {
  orderList.addEventListener('click', removeBurgerFromlist)
}

const removeBurgerFromlist = (event) => {
  if(event.target.classList.contains('remove-button')){
    event.target.parentElement.remove()
  }
}

const addEventListenerToCustomBurgerForm = () => {
  customBurgerForm.addEventListener('submit', addCustomBurgerToBurgerMenu)
}

const addCustomBurgerToBurgerMenu = (event) => {
  event.preventDefault();
  let customBurgerName = customBurgerForm.name.value
  let customBurgerDescription = customBurgerForm.description.value
  let customBurgerImageURL = customBurgerForm.url.value

  // debugger

  fetch(BURGERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: customBurgerName,
      description: customBurgerDescription,
      image: customBurgerImageURL
    })
  })
  .then(res => res.json())
  .then(newBurgerData => showOneBurgerInBurgerMenu(newBurgerData))
}

// Done at 10:07am. Clocked at 32mins (plus about 5 mins for initial setup)
// Going to add remove menu item button and have it persist (for practice)

const addEventListenerToBurgerMenuToRemoveBurger = () => {
  burgerMenu.addEventListener('click', removeBurgerFromBurgerMenu)
}

const removeBurgerFromBurgerMenu = (event) => {
  if(event.target.classList.contains('remove-item-button')){
    let burgerID = event.target.dataset.id

    event.target.parentElement.remove();

    fetch(`${BURGERS_URL}/${burgerID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(resData => console.log('Burger Removed From Database!'))
  }
}

// going to add Remove All, Empty Cart Button (not timing this, this is just for fun)
const addEventListenerToOrderDivForEmptyCartButton = () => {
  orderDiv.addEventListener('click', emptyCart)
}

const emptyCart = (event) => {
  if(event.target.classList.contains('empty-cart-button')){
    event.target.nextElementSibling.innerHTML = ''
  }
}

// going to add a fun checkout button now
const addEventListenerToOrderDivForCheckoutButton = () => {
  orderDiv.addEventListener('click', checkoutOrder)
}

const checkoutOrder = (event) => {
  if(event.target.classList.contains('checkout-button')){
    orderList.innerHTML = ''

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomNumber = getRandomInt(0, 500)

    alert(`YOU SPENT $${randomNumber} DOLLARS! THANK YOU!`)
  }
}

const originalAlert = window.alert;
window.alert = function(args) {
  document.querySelector("html").classList.add("darkenPage");
  setTimeout(function() {
    originalAlert(args);
    document.querySelector("html").classList.remove("darkenPage");
  });

}


// finished Delete Button and it persists too. It's 10:14am. clocked at 38mins (still plus 5 from the initial setup)

// CALLS
getBurgersFetch();
addEventListenerToBurgerMenuToAddBurgerToOrder();
addEventListenerToOrderListForRemoveButton();
addEventListenerToCustomBurgerForm();
addEventListenerToBurgerMenuToRemoveBurger();
addEventListenerToOrderDivForEmptyCartButton();
addEventListenerToOrderDivForCheckoutButton();

}) // DOMCONTENTLOADED
