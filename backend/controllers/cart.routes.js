const express = require("express");
const CartItem = require("../model/cartItem.model");
const { userModel } = require("../model/user.model");

const cartRouter = express.Router();

// -------------------------------------------------------------
// Import necessary modules and models

const createProduct = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    // Find the user by ID
    let user = await userModel.findById({ _id: userId });

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user's current cart
    let cart = user.cartitem;

    let cartData = new CartItem({cart});
    await cartData.save();

    // Add the new product to the cart
    cart.push(req.body);

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate({ _id: userId }, { cartitem: cart });

    // Fetch the updated user data after the update
    let updatedUser = await userModel.findById({ _id: userId });

    // Respond with the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Route for adding a product to the cart of a particular user (http://localhost:5000/cart/add/:userId);
cartRouter.post("/add/:userId", createProduct);


// -------------------------------------------------------------

const deleteProduct = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    // const savedproduct=await product.save();
    try {
      let user = await userModel.findById({ _id: userId });
      let cart = user.cartitem;
      console.log("this is from cart and this is old user:- ", user, cart);
      newcart = cart.filter((elem) => {
        return elem._id !== req.body._id;
      });
      await userModel.findByIdAndUpdate({ _id: userId }, { cartitem: newcart });
      let sameuser = await userModel.findById({ _id: userId });
      console.log("this is from cart and this is new user:- ", sameuser);
    } catch (error) {
      next(error);
    }
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
};

// route for the delete the data in to cart of perticuler user.(http://localhost:8080/cart/delete/:userId);
cartRouter.post("/delete/:userId", deleteProduct);

// cartRouter.delete("/delete/:id" , async(req,res) => {
//     const ID = req.params.id;
//     try {
//         res.send("updated deleted successfully..");
//     } catch (error) {
//         res.send({error : error});
//     }
// })

module.exports = cartRouter;
