const express = require("express");
const Router = express.Router();
const adminAuth = require("../middleware/adminAuth.middleware");
//Import Products Model
const Product = require("../model/product.model");
const path = require('path');
const mongoose = require('mongoose');

//Import QueryFinder controller.
const QueryFinder = require("../Utils/QueryFinder");
const fs = require('fs');

const cors = require('cors');
Router.use(cors());

//route for the get request via query.
// url for get from search (http://localhost:8080/products?title=<product>)

Router.get('/allproducts', async (req, res) => {
  try {
    const { maincategory, page } = req.query;
    const itemsPerPage = 10; // You can adjust this based on your requirements
    const currentPage = parseInt(page) || 1;

    let query = {};

    if (maincategory && maincategory !== 'All') {
      query.maincategory = maincategory;
    }

    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const products = await Product.find(query)
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.json({
      products,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const getSingleProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const totalProduct = await Product.findById({ _id: id });
    res.status(200).send({ success: true, totalProduct });
  } catch (error) {
    res.send({ error: error.message });
  }
};
//Single Products into the database at url (http://localhost:8080/products/:id)
Router.route("/:id").get(getSingleProducts);

// post The all Products into the database at url (http://localhost:8080/products/add)

Router.use(adminAuth);

Router.post("/add", adminAuth, async (req, res) => {
  const loge = req.body;

      // Function to save data URL as an image and return the file path
      const saveImageFromDataURL = (dataURL) => {
        const base64Data = dataURL.split(';base64,').pop();
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const imageFileName = `${uniqueSuffix}.jpg`; // Change extension as needed
        const imagePath = path.join("uploads", imageFileName);
        
        fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });
        return imagePath;
      };

      const imgPath1 = saveImageFromDataURL(loge.img1);
      const imgPath2 = saveImageFromDataURL(loge.img2);

  try {

    // Create a new Product instance and populate its properties
    let data = new Product({
      title: loge.title,
      price: loge.price,
      img1: imgPath1, // Use the file path instead of the data URL
      img2: imgPath2, // Use the file path instead of the data URL
      maincategory: loge.maincategory,
      category: loge.category,
      strike: loge.strike,
      stocks: loge.stocks
    });

    await data.save();
    res.status(200).send({ msg: "Product added successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Something Went Wrong!" });
  }
});

// delete Products into the database at url (http://localhost:8080/products/delete/id)

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Something Went Wrong!" });
  }
});

Router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    if (payload.img1 && typeof payload.img1 === 'string') {
      const img1Buffer = Buffer.from(payload.img1.split(',')[1], 'base64');
      const img1Extension = payload.img1.split(';')[0].split('/')[1];
      const img1Path = path.join('uploads', `${id}_img1.${img1Extension}`);
      fs.writeFileSync(img1Path, img1Buffer);
      payload.img1 = img1Path;
    }

    if (payload.img2 && typeof payload.img2 === 'string') {
      const img2Buffer = Buffer.from(payload.img2.split(',')[1], 'base64');
      const img2Extension = payload.img2.split(';')[0].split('/')[1];
      const img2Path = path.join(__dirname, '../uploads', `${id}_img2.${img2Extension}`);
      fs.writeFileSync(img2Path, img2Buffer);
      payload.img2 = img2Path;
    }
  
    await Product.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "Updated product successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Something Went Wrong!" });
  }
});

Router.get("/get/getone/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = await Product.find({ _id: id });
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ msg: "Something Went Wrong!" });
  }
});


Router.get("/get/all", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).send({ product: product });
  } catch (error) {
    res.status(500).send({ msg: "Something Went Wrong!" });
  }
});

module.exports = Router;
