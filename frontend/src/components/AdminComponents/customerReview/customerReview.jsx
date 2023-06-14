import React from "react";
import { Box, Text } from "@chakra-ui/react";

const CustomerReview = ({ reviews }) => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Customer Reviews
      </Text>
      {reviews.map((review, index) => (
        <Box key={index} bg="gray.100" p={4} mb={4}>
          <Text>{review}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default CustomerReview;
