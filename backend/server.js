const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(cors());

const maxRequestBodySize = '100mb';
app.use(express.json({limit: maxRequestBodySize}));
app.use(express.urlencoded({limit: maxRequestBodySize}));

//Loading config
dotenv.config({ path: "./config/config.env" });

// Use body-parser middleware
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

mongoose.set('strictQuery', false);

db.on("error", (err) => {
  console.log(err);
});

// Serve static files (including images) from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.once("open", () => {
  console.log("Database connection established!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Authenticate = require("./middleware/userAuth.middleware");
//Import user Route
const { userRouter } = require("./controllers/user.router");
//Import Products Route
const productsRouter = require("./controllers/product.router");
//Import Admin Route
const adminRouter = require("./controllers/admin.router");
//Import Cart Route
const cartRouter = require("./controllers/cart.routes");
//Import Wishlist Route
const wishlistRouter = require("./controllers/wishlist.route");
const Router = require("./controllers/alluser.router");
app.use("/alluser", Router);
//for User Router
app.use("/user", userRouter);
//  app.use(Authenticate)
// For Products Router
app.use("/products", productsRouter);

// For admin Router
app.use("/admin", adminRouter);

//For Cart Router
app.use("/cart", cartRouter);

//For wishlist Router
app.use("/wishlist", wishlistRouter);

//For orderlist Router
app.use("/orderlist", wishlistRouter);
