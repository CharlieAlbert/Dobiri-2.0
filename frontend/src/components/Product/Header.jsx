import {
  Box,
  Heading,
  HStack,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Styles from "./Header.module.css";

//Images
import All from '../../Assets/All-icon.png';

export default function Header({ title, setQuery, setSortdata ,query, fetchFurniture, fetchLiquor, fetchVape}) {
  return (
    <VStack w={"100%"} justifyContent="center" spacing={7} className={Styles.main}>
      <Heading as="h1" size="xl" noOfLines={1}>
        {title}
      </Heading>
      {title === "All Product"&&
        <Box  className={Styles.categ} display={{ lg: "flex", md: "flex", base: "block" }}>
      <VStack justifyContent="center" alignItems="center" spacing={1}>
        
        <Image
          src={All}
          alt="All"
          className={query==="all"?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={() => setQuery("")}
        />
        <Text className={Styles.text}>All</Text>
      </VStack>
      <VStack justifyContent="center" alignItems="center" spacing={2}>
        <Image
          src="https://images.dailyobjects.com/marche/assets/images/other/filter-icon.jpg?tr=cm-pad_crop,v-2,w-70,h-70,dpr-1"
          alt="bag"
          className={query==="furniture"?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={fetchFurniture}
        />
        <Text className={Styles.text}>Furniture</Text>
      </VStack>
      <VStack justifyContent="center" alignItems="center" spacing={2}>
        <Image
          src="https://images.dailyobjects.com/marche/icons/category/platrorm-desk-collection.png?tr=cm-pad_resize,v-2,w-70,h-70,dpr-1"
          alt="desks"
          className={query==="liquor"?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={fetchLiquor}
        />
        <Text className={Styles.text}>Liquor</Text>
      </VStack>
      <VStack justifyContent="center" alignItems="center" spacing={2}>
        <Image
          src="https://images.dailyobjects.com/marche/icons/category/watchbands-filter-icon-for-new-arrival.jpg?tr=cm-pad_crop,v-2,w-70,h-70,dpr-1"
          alt="watch"
          className={query==="Vape"?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={fetchVape}
        />
        <Text className={Styles.text}>Vapes</Text>
      </VStack>
    </Box>}
      {title === "SALES"&&
        <Box  className={Styles.categ} display={{ lg: "flex", md: "flex", base: "block" }}>
      <VStack justifyContent="center" alignItems="center" spacing={1}>
        <Image
          src="https://images.dailyobjects.com/marche/icons/new-arrival/all.png?tr=cm-pad_resize,v-2,w-70,h-70,dpr-1"
          alt="All"
          className={query===""?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={() => setQuery("")}
        />
        <Text className={Styles.text}>All</Text>
      </VStack>
      <VStack justifyContent="center" alignItems="center" spacing={1}>
        <Image
          src="https://images.dailyobjects.com/marche/icons/category/sale-messenger-bags.png?tr=cm-pad_resize,v-2,w-160,h-160,dpr-1"
          alt="messengerbag"
          className={query==="messengerbag"?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={() => setQuery("messengerbag")}
        />
        <Text className={Styles.text}>Messenger Bag</Text>
      </VStack>
      <VStack justifyContent="center" alignItems="center" spacing={1}>
        <Image
          src="https://images.dailyobjects.com/marche/icons/category/sale-wallets.png?tr=cm-pad_resize,v-2,w-160,h-160,dpr-1"
          alt="wallet"
          className={query==="wallet"?`${Styles.text1} ${Styles.text2}`:Styles.text1}
          onClick={() => setQuery("wallet")}
        />
        <Text className={Styles.text}>Wallet</Text>
      </VStack>
    </Box>}
      <HStack>
        <Text as="h3">Fillter</Text>
        <Select placeholder="Select Filter option" onChange={(e)=>setSortdata(e.target.value)} >
          <option value="reset">Reset</option>
          <option value="LTH">Low to High</option>
          <option value="HTL">High to Low</option>
        </Select>
      </HStack>
    </VStack>
  );
}