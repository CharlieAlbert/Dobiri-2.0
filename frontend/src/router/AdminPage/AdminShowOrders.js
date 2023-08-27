import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/AdminComponents/AdminNavbar/Navbar";
import AdminGetOrders from "../../components/AdminComponents/AdminOrders/AdminGetOrders";

const AdminShowOrders = () => {
  return (
    <div>
      <Navbar />
      <Box minH="100vh" bg={"gray.100"}>
        <Container maxW={"80%"} margin={"auto"} mr={"20px"}>
          <AdminGetOrders />
        </Container>
      </Box>
    </div>
  );
};

export default AdminShowOrders;
