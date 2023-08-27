import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./SingleProduct.module.css";
import { Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function SingleProduct() {
  const user = useSelector((user) => user.loginAuth.user);
  const adminData = useSelector((state) => state.adminAuth.data);
  const baseUrl = "http://localhost:5000/";
  let uid;

  if(user == null){
    uid = adminData[0]._id;
  }else{
    uid = user._id;
  }

  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [cartdata, setCartdata] = useState(
    JSON.parse(localStorage.getItem("cart")) || (user && user.cartitem) || []
  );
  const [wishlist, setwishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || (user && user.wishlist) || []
  );

  const [whit, setWhit] = useState(false);
  const [cartlists, setcartlist] = useState(false);
  const { id } = useParams();
  const ref = useRef(null);

  const getdata = async (id) => {
    try {
      const res = await axios(
        `http://localhost:5000/products/${id}`
      );
      setData(res.data.totalProduct);

      // Add a check to ensure wishlist is an array before using filter
      if (Array.isArray(wishlist)) {
        const whishl = wishlist.filter(
          (elem) => elem._id === res.data.totalProduct._id
        );
        const cartlist = cartdata.filter(
          (elem) => elem._id === res.data.totalProduct._id
        );
        if (cartlist.length > 0) setcartlist(true);
        if (whishl.length > 0) setWhit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

const getuser = async (id) => {
  try {
    let newuser;
    if(user != null){
      newuser = await axios.get(baseUrl + `user/${id}`);
    }else{
      newuser = await axios.get(baseUrl + `Admin/${id}`);
    }
    console.log(newuser.data.user[0]);
    const loginuser = newuser.data.user[0];

    if (loginuser) {
      const whishl = loginuser.wishlist.filter((elem) => elem._id === data._id);
      if (whishl.length > 0) setWhit(true);

      localStorage.setItem("user", JSON.stringify(loginuser));
      localStorage.setItem("cart", JSON.stringify(loginuser.cartitem));
      localStorage.setItem("wishlist", JSON.stringify(loginuser.wishlist));
    } else {
      console.log("User data not found.");
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};


  const deleteitem = async (id, deleted) => {
    setWhit(false)
    const res= await axios.post(
      baseUrl + `/wishlist/delete/${id}`,
      deleted
    );
    const newdata = wishlist.filter((elem) => elem._id !== res.data._id);
    localStorage.setItem("wishlist", JSON.stringify(newdata));
    setwishlist(newdata);
  };
  useEffect(() => {
    getdata(id);
    getuser(uid);
  }, [id, uid]);

  const addtowislist = async () => {
    const cartlist = wishlist.filter((elem) => elem._id === data._id);
    try {
      if (cartlist.length > 0) {
        alert("Already Added in wishlist");
      } else {
        await axios.post(baseUrl + `/wishlist/add/${user._id}`,
          data
        );
        const newdata = [...wishlist, data];
        setWhit(true);

        setwishlist(newdata);
        localStorage.setItem("wishlist", JSON.stringify(newdata));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addtocart = async () => {
    const cartlist = cartdata.filter((elem) => elem._id === data._id);
    try {
      if (cartlist.length > 0) {
        setcartlist(true);
        alert("Already Add in Cart");
      } else {
        await axios.post(
          baseUrl + `/cart/add/${user._id}`,
          data
        );
        const newdata = [...cartdata, data];
        setcartlist(true);
        setCartdata(newdata);
        localStorage.setItem("cart", JSON.stringify(newdata));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {data._id ? (
        <Box
          w="90%"
          display={{ lg: "flex", md: "flex", base: "block" }}
          className={Styles.main}
        >
          <Box width={{lg:"50%",md:"50%",base:"100%"}}>
            <Image src={baseUrl + data.img1} ref={ref} />
            <HStack width={{lg:"80%",md:"90%",base:"90%"}}>
              <Image
                src={baseUrl + data.img1}
                onClick={() => {
                  ref.current.src = baseUrl + data.img1;
                }}
                width={{lg:"30%",md:"45%",base:"30%"}}
              />
              <Image
                src={baseUrl + data.img2}
                onClick={() => {
                  ref.current.src = baseUrl + data.img2;
                }}
                width={{lg:"30%",md:"45%",base:"30%"}}

              />
            </HStack>
            {whit ? (
              <BsHeartFill
                className={`${Styles.icon} ${Styles.icon2}`}
                onClick={()=>deleteitem(uid,data)}
                style={{cursor: "pointer"}}
              />
            ) : (
              <BsHeart
                className={`${Styles.icon} ${Styles.icon1}`}
                onClick={addtowislist}
                style={{cursor: "pointer"}}
              />
            )}
          </Box>
          <Box width={{lg:"50%",md:"50%",base:"100%"}}>
            <Text as="h2">{data.title}</Text>
            <Box display={{lg:"flex"}}>
            <HStack>
              <Text as="h3" fontSize={{lg:"2rem",md:"1.75rem",base:"1.75rem"}}>Ksh.{data.price}</Text>
              <Text as="h3" fontSize={{lg:"1.6rem",md:"1.3rem",base:"1.0rem"}}>{data.strike}</Text>
            </HStack>
              <Text as="p" style={{marginTop: "10px"}}  fontSize={{lg:"1rem",md:"1rem",base:"1rem"}}>&nbsp; Inclusive of all taxes</Text>
            </Box>
            <HStack>
              <Text as="p">Extra 10% cashback upto Ksh 500 with your Debit Card</Text>
              <Image
                src="https://img.freepik.com/free-vector/realistic-credit-card-design_23-2149126090.jpg?w=740&t=st=1692852072~exp=1692852672~hmac=90617b4056abcb477ba07204bd0e40e98c6efc5e087bd5c28a5e9b6d1c86da4e"
                w="120px"
                h="120px"
              />
            </HStack>
            {cartlists ? (
              <Button
                onClick={() => navigate("/cart")}
                disabled={data.stocks <= 0}
                className={data.stocks <= 0 ? Styles.btn1 : Styles.btn}
              >
                GO TO CART
              </Button>
            ) : (
              <Button
                onClick={addtocart}
                disabled={data.stocks <= 0}
                className={data.stocks <= 0 ? Styles.btn1 : Styles.btn}
              >
                {data.stocks <= 0 ? "NOTIFY SOON" : "ADD TO CART"}
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <VStack
          w="100%"
          minH="500px"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </VStack>
      )}
    </>
  );
}
