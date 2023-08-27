import { Button } from "@chakra-ui/react";
import React from "react";

function CreateArrayOfSize(n) {
  return new Array(n).fill(0);
}

const Pagination = ({
  totalPage,
  currentPage,
  handlePageChange,
}) => {
  // Validate totalPage to ensure it's a positive integer
  if (typeof totalPage !== "number" || totalPage <= 0 || !Number.isInteger(totalPage)) {
    return null; // Or some fallback UI indicating an error
  }

  const page = CreateArrayOfSize(totalPage).map((a, i) => (
    <Button
      _hover={{
        bg: "#02B862",
      }}
      bg={"green.600"}
      color={"white"}
      key={i + 1}
      disabled={currentPage === i + 1}
      onClick={() => handlePageChange(i + 1)}
      variant="outline"
    >
      {i + 1}
    </Button>
  ));

  return (
    <div>
      <div>{page}</div>
    </div>
  );
};

export default Pagination;
