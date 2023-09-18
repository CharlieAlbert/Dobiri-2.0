import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const StaffSignup = () => {
  const [signup, setSignup] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      ...signup,
      role: "staff", // Adding the role 'admin'
    };

    console.log(signupData);

    fetch("http://localhost:5000/admin/admin-signup", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg === "User Register Successfully") {
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
          navigate("/admin-login");
        } else {
          toast({
            title: "User already exists. Please Login",
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
          navigate("/admin-login");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Any additional logic you want to perform on component mount
  }, []);

  return (
    <>
      <div>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg="#fff"
        >
          <Stack
            spacing={6}
            w={"full"}
            maxW={"xl"}
            rounded={"xl"}
            boxShadow={"lg"}
            bg="white"
            p={5}
            my={12}
            alignItems={"center"}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Staff Register
            </Heading>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              {/* Hidden Role Input */}
              <input
                type="hidden"
                name="role"
                value="Staff"
                onChange={handleChange}
              />
              {/* First Name */}
              <FormControl id="email" isRequired pb={"20px"}>
                <FormLabel fontSize={"18px"}>First Name</FormLabel>
                <Input
                  placeholder="First_Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                />
              </FormControl>

              {/* Last Name */}
              <FormControl isRequired pb={"20px"}>
                <FormLabel fontSize={"18px"}>Last Name</FormLabel>
                <Input
                  placeholder="Last_Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                />
              </FormControl>

              {/* Email */}
              <FormControl isRequired pb={"20px"}>
                <FormLabel fontSize={"18px"}>Email address</FormLabel>
                <Input
                  placeholder="your-email@domain.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>

              {/* Password */}
              <FormControl isRequired pb={"20px"}>
                <FormLabel fontSize={"18px"}>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </FormControl>

              {/* Mobile Number */}
              <FormControl isRequired pb={"20px"}>
                <FormLabel fontSize={"18px"}>Mobile Number</FormLabel>
                <Input
                  placeholder="0123456789"
                  _placeholder={{ color: "gray.500" }}
                  type="Number"
                  name="mobile"
                  onChange={handleChange}
                />
              </FormControl>

              <Stack spacing={6} alignItems={"center"}>
                <Button
                  width={"200px"}
                  bg={"#000"}
                  color={"white"}
                  _hover={{
                    bg: "#eb5e28",
                  }}
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </form>
            <Stack spacing={6} alignItems={"flex-end"}>
              <Link to="/admin-login">
                <Button
                  width={"200px"}
                  bg={"#000"}
                  color={"white"}
                  _hover={{
                    bg: "#eb5e28",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
      </div>
    </>
  );
};

export default StaffSignup;
