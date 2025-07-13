const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectDB = require("./config/db");
const path = require("path");
const Product = require("./models/Product");

const userRoutes = require(path.join(__dirname, "routes/user"));
const productRoutes = require("./routes/product"); // ✅ Declare this only ONCE and before use

const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "ecom-secret",
  resave: false,
  saveUninitialized: true
}));

// Routes
app.get("/", async (req, res) => {
  const products = await Product.find();
  const user = req.session.user || null;
  res.render("home", { user, products });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use("/", userRoutes);
app.use("/products", productRoutes); // ✅ Use after defining

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
