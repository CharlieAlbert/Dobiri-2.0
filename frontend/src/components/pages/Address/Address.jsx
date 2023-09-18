import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { OrderSummary } from "../Cart/OrderSummary";
import AddressForm from "./AddressForm";
import Already from "./Already";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function Address() {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(true);
  const [input, setInput] = useState(initialAddForm);
  const [price, setPrice] = useState(0);
  const [striker, setStriker] = useState(0);
  const [qua, setQua] = useState(1);
  const user = useSelector((user) => user.loginAuth.user);
  const adminData = useSelector((state) => state.adminAuth.data);

  let uid;
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || (user && user.cartitem) || []
  );

  let deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails")) || [];
  let deliveryAddress;
  let deliveryLandmark;

  if(deliveryDetails == '' || deliveryDetails == null){
    deliveryAddress = '';
    deliveryLandmark = ''
  }else{
    deliveryAddress = deliveryDetails[0].add;
    deliveryLandmark = deliveryDetails[0].landmark;
  }

  // name, add, landmark, pin, mob
  const [initialAddForm, setInitialForm] = useState({
    name: userData.first_name +" " +userData.last_name,
    mob: userData.mobile,
    add: deliveryAddress,
    landmark: deliveryLandmark,
  });

  if (user == null) {
    if (adminData[0]) {
      uid = adminData[0]._id;
    } else {
      // Handle the case where adminData[0] is also undefined or null
      uid = ""; // Set a default value or handle it accordingly
    }
  } else {
    uid = user._id;
  }

    
  const finalPrice = price - striker;
  const productDiscount = striker;

  var totalAmount = [finalPrice, productDiscount];

  // Store the 'prices and discount' array in a cookie named 'totalAmount'
  Cookies.set("totalAmount", JSON.stringify(totalAmount)); 

  const data = JSON.parse(localStorage.getItem("cart")) || [];
  const checkPrice = () => {
    let pr = data.reduce((p, elem) => p + Number(elem.price), 0);
    setPrice(pr);
    let st = data.reduce((p, elem) => p + Number(elem.strike), 0);
    setStriker(st);
    
  };
  useEffect(() => {
    checkPrice();
  }, [qua]);
  return (
    <Box
      display={{ lg: "flex", md: "flex", base: "block" }}
      w={{ lg: "90%", md: "90%", base: "100%" }}
      m="auto"
      mb="5vh"
      justifyContent="space-between"
    >
      <Box
        w={{ lg: "55%", md: "50%", base: "100%" }}
        mt="4vh"
        h="fit-content"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        borderRadius="10px"
        p={{ lg: "3vh", md: "3vh 2vh", base: "3vh" }}
      >
        {show ? (
          <AddressForm onClick={(e) => setShow(e)} input={input} setInput={setInput} />
        ) : (
          <Already
            onClick={(e) => {
              setShow(e);
              setCheck(e);
              }}
              data={input}
              show={show}
          />
        )}
      </Box>
      <Box w={{ lg: "35%", md: "45%", base: "100%" }}>
        <OrderSummary show={check} price={price} discount={striker} total={data.length }/>
      </Box>
    </Box>
  );
}
