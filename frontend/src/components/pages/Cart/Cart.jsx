import styles from "./cart.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Box, Button, Flex, color } from "@chakra-ui/react";
import { OrderSummary } from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Cart = () => {
  const [data, setdata] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [price, setPrice] = useState(0);
  const user = useSelector((user) => user.loginAuth.user);
  const adminData = useSelector((state) => state.adminAuth.data);
  const baseUrl = "http://localhost:5000/";
  let uid;

  if(user == null){
    uid = adminData[0]._id;
  }else{
    uid = user._id;
  }

  const [striker, setStriker] = useState(0);
  const [qua, setQua] = useState(1);

  const navigate = useNavigate();

  const checkPrice = () => {
    let pr = data.reduce((p, elem) => p + Number(elem.price), 0);
    setPrice(pr);
    let st = data.reduce((p, elem) => p + Number(elem.strike), 0);
    setStriker(st);
  };

  const getuser = async (id) => {
    const newuser = await axios.get(
      baseUrl + `user/${id}`
    );
    const loginuser = newuser.data.user[0];
    localStorage.setItem("user", JSON.stringify(loginuser));
    localStorage.setItem("cart", JSON.stringify(loginuser.cartitem));
    localStorage.setItem("wishlist", JSON.stringify(loginuser.wishlist));
  };
  useEffect(() => {
    checkPrice();
    getuser(uid);
  }, [qua, uid, data]);

  const deleteitem = async (id, deleted) => {
    const res = await axios.post(
      baseUrl + `cart/delete/${id}`,
      deleted
    );
    const newdata = data.filter((elem) => elem._id !== res.data._id);
    localStorage.setItem("cart", JSON.stringify(newdata));
    setdata(newdata);
  };

  let product = data.map((ele) => ({
    title: ele.title,
    category: ele.category,
    price: ele.price,
    stocks: ele.stocks,
    strike: ele.strike,
  }));

  // Store the 'product' array in a cookie named 'cartProducts'
  Cookies.set("cartProducts", JSON.stringify(product)); 

  const EmptyCart = () => {
    return (
      <div className={styles.empty}>
        <p>YOUR SHOPPING CART IS EMPTY</p>
        <p>Fill it with DailyObjects</p>
        <p>
          <Button
            onClick={() => navigate("/allProducts")}
            width={"200px"}
            bg={"#000"}
            color={"white"}
            _hover={{
              bg: "#eb5e28",
            }}
            type="submit"
          >
            Browse Products
          </Button>
        </p>
      </div>
    );
  };

  return (
    <div className={styles.cart}>
      <div>
        {data.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <p className={styles.heading}>SHOPPING CART</p>
            <hr />
            <Box
              display={{ lg: "grid", md: "grid", base: "block" }}
              className={styles.cartItem}
            >
              <div>
                {data.map((ele) => {
                  return (
                    <div>
                      <div className={styles.cartItemData}>
                        <img
                          src={baseUrl + ele.img1}
                          max-width={"100%"}
                          style={{
                            height: "auto",
                            aspectRatio: "3/2",
                            objectFit: "contain",
                          }}
                          alt=""
                          onClick={() => navigate(`/products/${ele._id}`)}
                        />
                        <div>
                          <p>{ele.title}</p>
                          <span className={styles.price}>Ksh.{ele.price}</span>
                          <span className={styles.line}>{ele.strike}</span>
                          <Flex style={{ margin: "2.5rem 0" }} gap={10}>
                            <div>
                              <button
                                onClick={() => setQua(qua - 1)}
                                disabled={qua === 1}
                                style={{
                                  width: "5vh",
                                  height: "5vh",
                                  border: "2px solid gray",
                                }}
                              >
                                -
                              </button>
                              <button
                                style={{
                                  width: "5vh",
                                  height: "5vh",
                                  border: "2px solid gray",
                                }}
                              >
                                {qua}
                              </button>
                              <button
                                onClick={() => setQua(qua + 1)}
                                disabled={qua === 5}
                                style={{
                                  width: "5vh",
                                  height: "5vh",
                                  border: "2px solid gray",
                                }}
                              >
                                +
                              </button>
                            </div>
                            <div>
                              <RiDeleteBin6Line
                                size={30}
                                style={{color: "black", cursor: "pointer"}}
                                onClick={() => deleteitem(user._id, ele)}
                              />
                            </div>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <OrderSummary
                  price={price}
                  discount={striker}
                  total={data.length}
                />
              </div>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
