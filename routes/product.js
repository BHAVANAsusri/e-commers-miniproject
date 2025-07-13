const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// Show all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  const user = req.session.user;
  res.render("home", { products, user });
});

// Add to cart
router.post("/add-to-cart/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    if (!req.session.cart) {
      req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect("/products/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
});

// View cart
router.get("/cart", (req, res) => {
  const cartItems = req.session.cart || [];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  res.render("cart", { cartItems, total });
});

// Remove from cart
router.post("/remove-from-cart/:id", (req, res) => {
  const productId = req.params.id;
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item._id !== productId);
  }
  res.redirect("/products/cart");
});
// GET: Checkout Page
router.get("/checkout", (req, res) => {
  const cartItems = req.session.cart || [];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  res.render("checkout", { cartItems, total });
});
// POST: Confirm Order
router.post("/checkout", (req, res) => {
  const { address } = req.body;

  // You can optionally save the order to a DB here

  // Clear the cart
  req.session.cart = [];

  res.render("order-success", { address });
});





module.exports = router;
