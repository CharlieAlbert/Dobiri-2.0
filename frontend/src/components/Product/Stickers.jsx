import { Grid, Spinner, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Items from "./Items";
import useFetch from "./hooks";
import { useDispatch, useSelector } from "react-redux";
import { handleProductdata } from "../../redux/Product/action";
import axios from "axios";

export default function Stickers() {
  const Reset = useSelector((b) => b.productReducer.Reset);
  const dispatch = useDispatch();
  const [count, setCount] = useState(false);
  const [query, setQuery] = useState("");
  const [sortdata, setSortdata] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [Data, setData] = useState([]); // State to hold the fetched data


  const maincategory = 'Stickers';
  
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
  }, []); 

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

if(query){Data=Data.filter((elem)=>elem.category===query)}
  if (sortdata === "LTH") {
    Data = Data.sort((a, b) => a.price - b.price);
  }else if (sortdata === "HTL") {
   Data = Data.sort((a, b) => b.price - a.price);
  } else if(sortdata==="reset") {
      Data = Reset;
    }
 if (query === "" && !count && Data.length > 0 && sortdata==="") {
    dispatch(handleProductdata(Data));
  }
  return (
    <>
      <Header
        title="Stickers"
        query={query}
        setQuery={setQuery}
        setSortdata={setSortdata}
        setCount={setCount}
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
        {Data.map((elem) => {
          return <Items key={elem._id} data={elem} />;
        })}
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
    </>
  );
}
