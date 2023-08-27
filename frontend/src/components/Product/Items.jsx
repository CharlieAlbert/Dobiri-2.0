import { Box, Card, CardFooter, Image, Stack, Text } from "@chakra-ui/react";
import Styles from "./Items.module.css";
import React, { useRef, useState,useEffect } from "react";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const baseUrl = "http://localhost:5000/";

export default function Items({ data }) {
  const user = useSelector((user) => user.loginAuth.user);
  const wishlistData = "wishlist";
  localStorage.setItem("wishlist", JSON.stringify(wishlistData)); // to retrive data use: const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || user.wishlist;

  const [wishlist, setwishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    try {
      return JSON.parse(storedWishlist) || [];
    } catch (error) {
      console.error("Error parsing wishlist data from localStorage:", error);
      return [];
    }
  });
  


  let token;
  let uid;

  if(localStorage.getItem("usertoken") == null){
    token = localStorage.getItem("AdminData");
    uid=token;
  }else{
    token = localStorage.getItem("usertoken");
    uid=token;
  }

  const navigate = useNavigate();
  const [whit, setWhit] = useState(false);
  const ref = useRef(null);
  const ChangeImage1 = () => {
    ref.current.src = baseUrl + data.img1;
  };
  const ChangeImage = () => {
    ref.current.src = baseUrl + data.img2;
  };

  useEffect(() => {
    const getuser = async(id) => {
      const newuser = await axios.get(baseUrl + `user/${id}`);
      const loginuser=newuser.data.user[0]
      const whishl = loginuser.wishlist.filter((elem) => elem._id === data._id);
      if (whishl.length > 0) setWhit(true);
      localStorage.setItem('user', JSON.stringify(loginuser))
      localStorage.setItem("cart", JSON.stringify(loginuser.cartitem));
      localStorage.setItem("wishlist", JSON.stringify(loginuser.wishlist));
    }
    getuser(uid)

  },[uid])
//  wishlist.filter((elem) => elem._id === data._id);

 const addtowislist = async () => {
  const cartlist = wishlist.filter((elem) => elem._id === data._id);
  try {
    if (cartlist.length > 0) {
      alert("Already Add in wishlist");
    } else {
   await axios.post(`https://dailybackend.onrender.com/wishlist/add/${uid}`,
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

  const deleteitem = async (id, deleted) => {
    setWhit(false);
  const res=await axios.post( `https://dailybackend.onrender.com/wishlist/delete/${id}`, deleted);
 const newdata = wishlist.filter((elem) => elem._id !== res.data._id);
 localStorage.setItem('wishlist', JSON.stringify(newdata));
 setwishlist(newdata);
}

  return (
    <Card w="100%" m="auto" mt={10} position="relative" style={{cursor: "pointer"}} borderRadius={20}  onClick={() => navigate(`/products/${data._id}`)}>
      <Box
        onMouseOver={ChangeImage}
        onMouseOut={ChangeImage1}
        h="300px"
        w="100%"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        className={`${Styles.cardImage}`}
      >
        <img
          src={baseUrl + data.img1}
          alt={data.title}
          ref={ref}
          className="img-fluid"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          bg="#f7f7f7"
        />
      </Box>
      <CardFooter>
        <Stack>
          <Text color="gray"  fontSize={{lg:"md",md:"sm",base:"xs"}}>
            
          </Text>
          <Text color="black" fontSize={{lg:"2xl",md:"xl",base:"xl"}} fontWeight="bold">
            Ksh.{data.price}
            <span
              style={{
                color: "gray",
                textDecoration: "line-through",
                marginLeft: "20px",
                fontSize:"1.25rem"
              }}
            >
              {data.strike}
            </span>
          </Text>
          
          <Text color="#EB5E28" fontSize={{ lg: "md", md: "md", base: "md" }} fontWeight="bold">
          {data.title}
            </Text>
        </Stack>
      </CardFooter>
      {whit ? (
        <BsHeartFill
          className={`${Styles.icon} ${Styles.icon2}`}
          onClick={()=>deleteitem(uid,data)}
        />
      ) : (
        <BsHeart
          className={`${Styles.icon} ${Styles.icon1}`}
          onClick={addtowislist}
        />
      )}
      {data.stocks <= 0 ? (
        <>
          <Box className={Styles.ribben_wrap}>
            <Box className={Styles.ribben}>Out Of Stock</Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
