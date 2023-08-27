import React from "react";
import { Box, CloseButton, Flex, Image } from "@chakra-ui/react";
import {
  FiShoppingCart,
  FiTrendingUp,
  FiUser,
  FiPieChart,
} from "react-icons/fi";
import NavItem from "./NavItem";

//Images
import logo from '../../../Assets/Dobiri.png';

const Sideba = ({ onClose, display }) => {
  const LinkItems = [
    { name: "Dashboard", icon: FiPieChart, link: "/admin" },
    { name: "Product", icon: FiTrendingUp, link: "/admin/product" },
    { name: "User", icon: FiUser, link: "/admin/user" },
    { name: "Orders", icon: FiShoppingCart, link: "/admin/orders" },
  ];

  return (
    <div>
      <Box
        transition="3s ease"
        bg={"white"}
        borderRight="1px"
        borderRightColor={"gray.200"}
        w={{ base: "full", md: 60 }}
        display={display}
        pos="fixed"
        h={"full"}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <div style={{backgroundColor: "#000", padding: "10px 20px 10px 20px", borderRadius: "10px"}}> <Image src={logo} />
          <Box
            width={{ base: "50%", sm: "60%", md: "40%", lg: "80%" }}
            display={{ lg: "none" }}
            style={{backgroundColor: "#000"}}
          >
           
           
          </Box>
          </div>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            name={link.name}
            link={link.link}
          />
        ))}
      </Box>
    </div>
  );
};

export default Sideba;
