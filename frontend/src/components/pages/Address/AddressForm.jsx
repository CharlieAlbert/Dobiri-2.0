import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Styles from "./AddressForm.module.css";

export default function AddressForm({ onClick, input, setInput }) {
  const [isError, setError] = useState({
    name: false,
    mob: false,
    add: false,
    pin: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const saveToLocalStorage = () => {
    // Create a new array with the form details
    const deliveryDetails = [
      {
        name: input.name,
        mob: input.mob,
        add: input.add,
        landmark: input.landmark,
      },
    ];

    // Get existing data from local storage if available
    const existingDetails = JSON.parse(localStorage.getItem("deliveryDetails")) || [];

    // Append the new details to the existing data
    const updatedDetails = [...existingDetails, ...deliveryDetails];

    // Save the updated details to local storage
    localStorage.setItem("deliveryDetails", JSON.stringify(updatedDetails));
  };

  const handleError = () => {
      saveToLocalStorage(); // Call the function to save form details
      onClick(false);
  };

  return (
    <Box className={Styles.addform}>
      <Box display={{ lg: "flex", md: "block", base: "block" }} gap={10}>
        <FormControl isRequired isInvalid={isError.name}>
          <FormLabel>Name</FormLabel>
          <Input
            value={input.name}
            placeholder="Name"
            onChange={handleInputChange}
            name="name"
          />
          {isError.name && (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={isError.mob}>
          <FormLabel>Mobile No.</FormLabel>
          <Input
            name="mob"
            maxLength="10"
            onChange={handleInputChange}
            value={input.mob}
            placeholder="Enter 10 digit no."
          />
          {isError.mob && (
            <FormErrorMessage>Mobile No. is required.</FormErrorMessage>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl isRequired isInvalid={isError.add}>
          <FormLabel>Delivery Address(Area / Building name)</FormLabel>
          <Textarea
            name="add"
            onChange={handleInputChange}
            value={input.add}
            placeholder="Type Your Address"
          ></Textarea>
          {isError.add && (
            <FormErrorMessage>Address is required.</FormErrorMessage>
          )}
        </FormControl>
      </Box>
      <Box display="flex" gap={10}>
        <FormControl>
          <FormLabel>Landmark</FormLabel>
          <Input
            name="landmark"
            onChange={handleInputChange}
            value={input.landmark}
            placeholder="Enter Landmark"
          />
        </FormControl>
      </Box>
      <Box display="flex" gap={10}>
      </Box>
      <Button
        type="submit"
        colorScheme="white"
        bg="rgb(0, 181, 181)"
        w="30%"
        onClick={handleError}
      >
        Save
      </Button>
    </Box>
  );
}
