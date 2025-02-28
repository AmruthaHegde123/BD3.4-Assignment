const express = require('express');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

//Array of cart data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//1:Function  to add an Item to the cart
function addNewItemToCart(productId, name, price, quantity) {
  let newItem = {
    productId: parseInt(productId),
    name: name,
    price: parseInt(price),
    quantity: parseInt(quantity),
  };
  cart.push(newItem);
  return cart;
}
//1:Endpoint to add an Item to the cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItemToCart(productId, name, price, quantity);

  res.json({ cartItems: cart });
});

//2:Function  to edit quantity of an Item in the cart
function editCartItemQuantity(productId, quantity) {
  let item = cart.find((item) => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
  return cart;
}
//2:Endpoint to edit quantity of an Item in the cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editCartItemQuantity(productId, quantity);

  res.json({ cartItems: cart });
});

//2:Function  to delete an Item from the cart
function deleteCartItem(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  return cart;
}
//2:Endpoint to delete an Item  from the cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteCartItem(productId);

  res.json({ cartItems: cart });
});

//4:Function to read Items in the cart
function readAllItems() {
  return cart;
}

//4:Endpoint to read all items in the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

//5: Function to calculate total quantity of items in the cart
function getTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

// 5:Endpoint to get total quantity of items in the cart
app.get('/cart/total-quantity', (req, res) => {
  res.json({ totalQuantity: getTotalQuantity() });
});

//6:Function to calculate total price of items in the cart
function getTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

//6:Endpoint to get total price of items in the cart
app.get('/cart/total-price', (req, res) => {
  res.json({ totalPrice: getTotalPrice() });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
