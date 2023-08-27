import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/AdminAddProduct/adminaddProduct.action";

function AdminAddProduct() {
  const [product, setProduct] = useState({});
  const { productData, msg } = useSelector((store) => store.adminAddProduct);
  console.log(msg);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    // Convert input images to data URLs
    const img1DataUrl = await convertToDataUrl(product.img1);
    const img2DataUrl = await convertToDataUrl(product.img2);

    // Create a new product object with data URLs
    const productWithImages = {
      ...product,
      img1: img1DataUrl,
      img2: img2DataUrl,
    };

    dispatch(addProduct(productWithImages));
    toast({
      title: msg,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    window.location.href = "/admin/product";
  };

  const hanldeChange = (e) => {

    const { name, value, files} = e.target;

    if (files && files[0]) {        
      setProduct({
        ...product,
        [name]: files[0], // Store the file object itself, not the data URL
      })
    }else{
      setProduct({
        ...product,
        [name]: value,
      });
    }
    
  };

  const handleImgUpload = (e) =>{

    const { name, value, files } = e.target;
        
    if (files && files[0]) {        
      setProduct({
        ...product,
        [name]: files[0], // Store the file object itself, not the data URL
      })
      
    }else{
      setProduct({
        ...product,
        [name]: value,
      });
    }
    
  }
  
  // Function to convert an image to data URL
  const convertToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(new Error("Failed to convert image to data URL"));
      };
      reader.readAsDataURL(file);
    });
  };

  console.log(product);
  return (
    <div>
      <Heading textAlign={"center"} pt={"20px"}>
        Add Product
      </Heading>
      <Flex justify={"center"} width={"100%"} bg={"whiteAlpha.800"} mt={"15"}>
        <form
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "30px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <Stack
            spacing={"10"}
            direction={{ base: "column", sm: "row" }}
            width={{ base: "100%", sm: "100%" }}
          >
            <Box width={{ base: "100%", sm: "100%" }}>
              <FormControl isRequired>
                <FormLabel>Product Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  onChange={hanldeChange}
                  placeholder={"Title"}
                />
              </FormControl>
            </Box>
            <Box width={{ base: "100%", sm: "100%" }}>
              <FormControl isRequired>
                <FormLabel>Product Price</FormLabel>
                <Input
                  type="text"
                  name="price"
                  onChange={hanldeChange}
                  placeholder={"Product Price"}
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack
            spacing={"10"}
            direction={{ base: "column", sm: "row" }}
            width={{ base: "100%", sm: "100%" }}
          >
           <FormControl isRequired>
            <FormLabel>First Image</FormLabel>
            <input
              type="file"
              name="img1"
              accept="image/*"
              className="productImageInput"
              onChange={hanldeChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Second Image</FormLabel>
            <input
              type="file"
              name="img2"
              accept="image/*"
              className="productImageInput"
              onChange={hanldeChange}
            />
          </FormControl>

          </Stack>
          <Stack
            width={{ base: "100%", sm: "100%" }}
            spacing={"10"}
            direction={{ base: "column", sm: "row" }}
          >
            <Box width={{ base: "100%", sm: "100%" }}>
              <FormControl isRequired>
                <FormLabel>Main-Category</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={handleImgUpload}
                  name="maincategory"
                  id="maincategory"
                >
                  <option value="Furniture">Furniture</option>
                  <option value="Liquor">Liquor</option>
                  <option value="Vape">Vape</option>
                  <option value="Stickers">Stickers</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Food">Food</option>
                </Select>
              </FormControl>
            </Box>
            <Box width={{ base: "100%", sm: "100%" }}>
              <FormControl isRequired>
                <FormLabel>Sub-Category</FormLabel>
                <Select onChange={handleImgUpload} name="category" id="subcategory" category>
                  {product.maincategory === "Furniture" && (
                    <>
                      <option value=""></option>
                      <option value="Bed">Bed</option>
                      <option value="Desk">Desk</option>
                      <option value="Chair">Chair</option>
                      <option value="Sofa">Sofa</option>
                      <option value="Shoe rack">Shoe rack</option>
                      <option value="Table">Table</option>
                    </>
                  )}
                  {product.maincategory === "Liquor" && (
                    <>
                      <option value=""></option>
                      <option value="Whisky">Whisky</option>
                      <option value="Wine">Wine</option>
                      <option value="Gin">Gin</option>
                      <option value="Rum">Rum</option>
                      <option value="Brandy">Brandy</option>
                      <option value="Vodka">Vodka</option>
                      <option value="Champagne">Champagne</option>
                      <option value="Beer">Beer</option>
                      <option value="Liqueur">Liqueur</option>
                      <option value="Tequila">Tequila</option>
                      <option value="Cognac">Cognac</option>
                    </>
                  )}
                  {product.maincategory === "Vape" && (
                    <>
                      <option value=""></option>
                      <option value="Vape">Vape</option>
                    </>
                  )}
                  {product.maincategory === "Stickers" && (
                    <>
                      <option value=""></option>
                      <option option value="Stickers">Stickers</option>
                    </>
                  )}
                  {product.maincategory === "Home Appliances" && (
                    <>
                      <option value=""></option>
                      <option value="Cook Top">Cook Top</option>
                      <option value="Cooker">Cooker</option>
                      <option value="Iron">Iron</option>
                      <option value="Kettle">Kettle</option>
                      <option value="Microwave">Microwave</option>
                      <option value="Television">Television</option>
                      <option value="Refrigerator">Refrigerator</option>
                    </>
                  )}
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Stack
            width={{ base: "100%", sm: "100%" }}
            spacing={"10"}
            direction={{ base: "column", sm: "row" }}
          >
            <Box width={{ base: "100%", sm: "100%" }}>
              <FormControl isRequired>
                <FormLabel>Price Strike</FormLabel>
                <Input
                  type="text"
                  name="strike"
                  onChange={hanldeChange}
                  placeholder={"Discount "}
                />
              </FormControl>
            </Box>
            <Box width={{ base: "100%", sm: "100%" }}>
              <FormControl isRequired>
                <FormLabel>Add Stocks</FormLabel>
                <Input
                  type="text"
                  name="stocks"
                  onChange={hanldeChange}
                  placeholder={"Stocks"}
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack
            spacing={10}
            pt={8}
            display={"flex"}
            direction={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "center", lg: "flex-end" }}
          >
            <Button
              width={{ base: "50%", sm: "50%", lg: "15%" }}
              size={"md"}
              bg={"green.700"}
              color={"white"}
              _hover={{
                bg: "#02B862",
              }}
              type={"submit"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Flex>
    </div>
  );
};

export default AdminAddProduct;
