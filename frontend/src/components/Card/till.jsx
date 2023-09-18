import React, { useState } from "react";
import "./till.css";
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from "react-transition-group";
import "./card.css";
import Cookies from "js-cookie";
import { color } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Till = () => {
  const [tillNumber, setTillNumber] = useState("12345678");
  const [amount, setAmount] = useState("");
  const user = useSelector((user) => user.loginAuth.user);

  const totalAmount = JSON.parse(Cookies.get("totalAmount") || "[]");//Get cart user cart products from cookie

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || (user && user.cartitem) || []
  );

  const [phoneNumber, setPhoneNumber] = useState(userData.mobile);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (tillNumber === "" || amount === "" || phoneNumber === "") {
      
      return;
    }

    // Simulate a payment request
    setTimeout(() => {
      // Clear the input fields
      setTillNumber("");
      setAmount("");
      setPhoneNumber("");

      // Show a success message
      alert("Payment successful!");
    }, 3000); // Wait for 3 seconds
  };

  return (
    <div class="container">
      <div class="card">
        <div class="card-header">LIPA NA MPESA</div>
        <div class="card-body">
          <form onSubmit={handleSubmit}>
            <div class="form-row">
              <div class="form-label" style={{textJustify: "start"}}>Till Number</div>
              <input
                type="text"
                class="form-input"
                value={tillNumber}
                style={{color: "#4CAF50", fontWeight: "700", background: "#000"}}
                disabled
                onChange={(e) => setTillNumber(e.target.value)}
                required
              />
            </div>
            <div class="form-row">
              <div class="form-label">Amount</div>
              <input
                type="number"
                class="form-input"
                value={totalAmount[0]}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div class="form-row">
              <div class="form-label">Phone Number</div>
              <input
                type="tel"
                class="form-input"
                placeholder= {userData.mobile}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
            <button type="submit" id="submit-btn">
              Pay
            </button>
            </div>
          </form>
          <p class="form-note">Simple Transparent Honest (C) 2020</p>
        </div>
      </div>
    </div>
  );
};

export default Till;
