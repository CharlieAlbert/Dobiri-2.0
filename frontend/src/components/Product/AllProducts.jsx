import { Grid, Spinner, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Items from "./Items";
import axios from "axios"; 

export default function AllProducts() {
  const [query, setQuery] = useState("All");
  const [sortdata, setSortdata] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // Use a more meaningful variable name
  
  const maincategory = 'All';
  
  useEffect(() => {
    const fetchData = async (maincategory, page) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:5000/products/allproducts`, {
          params: {
            maincategory: maincategory,
            page: page,
          },
        });

        setData(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData(maincategory, page);
  }, []); // Include maincategory and page in the dependency array

  const loader = useRef(null);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  let displayedData = [...data]; // Make a copy of the fetched data array

  if (query && query !== "All") {
    displayedData = data.filter((elem) => elem.category === query);
  }

  if (sortdata === "LTH") {
    displayedData = displayedData.sort((a, b) => a.price - b.price);
  } else if (sortdata === "HTL") {
    displayedData = displayedData.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Header
        title="All Products"
        query={query}
        setQuery={setQuery}
        setSortdata={setSortdata}
      />
      <Grid
        templateColumns={{
          lg: "repeat(4, 1fr)",
          md: "repeat(3,1fr)",
          base: "repeat(1,1fr)",
        }}
        gap={6}
        p="0 2rem"
      >
        {displayedData.map((elem) => (
          <Items key={elem._id} data={elem} />
        ))}
        <div ref={loader} />
      </Grid>
      {loading &&  <VStack w="100%" minH="500px" alignItems="center" justifyContent="center">
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </VStack>}
      {error && <p>Error!</p>}
      <br/>
      <br/>
      <br/>
    </>
  );
}
