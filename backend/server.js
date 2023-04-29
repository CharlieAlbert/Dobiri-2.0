const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//Loading config
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

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
