import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  color,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import Official from "./Official";

//Images
import heroImg from "../../Assets/Hero.png";
import heroImg2 from "../../Assets/Hero2.png";
import Chairs from "../../Assets/3450 wood side Chair.jpg";
import Sofas from "../../Assets/L-shaped Sofa.jpg";
import Desk from "../../Assets/Study desk.jpg";
import Tables from "../../Assets/Generic Shee Nordic Rectangular coffee.jpg";
import Liquor from "../../Assets/DOWAX-0.jpg";
import Shoerack from "../../Assets/Shoerack acacia wood 5 shelves.jpg";
import topDrink from "../../Assets/weekly drink.png";
import vape from "../../Assets/vape2.webp";
import stickers from "../../Assets/sticker1.jpg";
import groceries from "../../Assets/groceries.jpg";
import foodDelivery from "../../Assets/food-delivery.png";
import interiorDesign from "../../Assets/interiorDesign.png";

let baseUrl = 'http://localhost:5000/';

const shopCategories = [
  { _id: 1, url: Chairs, title: "Chairs" },
  { _id: 2, url: Sofas, title: "Sofas" },
  { _id: 3, url: Desk, title: "Desks" },
  { _id: 4, url: Tables, title: "Tables" },
  { _id: 5, url: Liquor, title: "Liquor" },
  {
    _id: 6,
    url: "https://images.dailyobjects.com/marche/assets/images/other/backpack-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Backpack",
  },
  {
    _id: 7,
    url: "https://images.dailyobjects.com/marche/assets/images/other/deskmat-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Desk Mat",
  },
  { _id: 8, url: Shoerack, title: "Shoerack" },
];

const newArrivals = [
  {
    url: "https://i.pinimg.com/564x/44/da/31/44da31049ceecf9cd19011af45a97e2e.jpg",
    color: "Available in 3 Colors",
    title: "Chair",
  },
  {
    url: "https://i.pinimg.com/564x/28/18/b6/2818b60ace396c7a2fc385c5c1639230.jpg",
    color: "Available in 2 Colors",
    title: "Desk",
  },
  {
    url: "https://i.pinimg.com/564x/71/84/79/7184792fe1ef205eb4ff6048e4299038.jpg",
    color: "",
    title: "Smirnoff",
  },
  {
    url: "https://i.pinimg.com/564x/19/6c/01/196c01aea1199e8363d122620bdf56fc.jpg",
    color: "Available in 2 Colors",
    title: "Shoerack",
  },
  {
    url: "https://i.pinimg.com/564x/a7/d7/60/a7d7606cea6f7619660949b3124cf471.jpg",
    color: "Available in 2 Colors",
    title: "Shelf",
  },
  {
    url: "https://i.pinimg.com/564x/31/6d/0b/316d0b84ea77c0a3e7877a4d756af3a5.jpg",
    color: "Available in 4 colors",
    title: "Vape",
  },
];

const Homepage = () => {

  const [query, setQuery] = useState("All");
  const [sortdata, setSortdata] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // Use a more meaningful variable name
  const [randomItems, setRandomItems] = useState([]);
  
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
  }, []);  // Include maincategory and page in the dependency array

  const randomProducts = data.sort(() => Math.random() - 0.5).slice(0, 7);

  function getTop3ItemsWithHighestStrike(data) {
    // Sort the array in descending order based on the 'strike' property
    const sortedData = data.sort((a, b) => b.strike - a.strike);
  
    // Slice the sorted array to get the top 3 items
    const top3Items = sortedData.slice(0, 3);
  
    return top3Items;
  }

  let highlights;

  if(data == '' || data == null){
    highlights = shopCategories;
  }
  else{
    highlights = getTop3ItemsWithHighestStrike(data);
  }
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component is mounted
  }, []);

  //Shop products section
  var products = [
    "Furniture",
    "Liquor",
    "Home Appliances",
    "Stickers",
    "Groceries",
    "Vape",
  ];
  var heroImgArray = [heroImg, heroImg2];

  var product;
  var heroImgItem;
  
  let currentIndex = 0;
  let currentIndex2 = 0;

  useEffect(() => {
    product = document.getElementById("products");
    if (product) {
      product.textContent = products[currentIndex];
    }

    setInterval(() => {
      product.textContent = products[currentIndex];
      currentIndex = (currentIndex + 1) % products.length;
    }, 3000);
  }, [currentIndex]);

  useEffect(() => {
    heroImgItem = document.getElementById("heroimg");
    if (heroImgItem) {
      heroImgItem.src = heroImgArray[currentIndex2];
    }
  }, [currentIndex2]);

  
  var heroImgChange = document.getElementsByClassName("heroSection");
  var currentIndex3 = 0;
  
  setInterval(() => {
    if (heroImgChange[currentIndex3]) {
      heroImgChange[currentIndex3].style.background = heroImgChangeArr[currentIndex3];
      currentIndex3 = (currentIndex3 + 1) % heroImgChangeArr.length;
    }
  }, 10000);

  //Hero section
  var heroImgChange = document.getElementsByClassName("heroSection");
  var currentIndex3 = 0;
  var heroImgChangeArr = [
    "url('../../Assets/furniture-living room.png')",
    "url('../../Assets/vegyimg.png')",
    "url('../../Assets/liquor-herosection.png')",
    "url('../../Assets/vape.png')",
  ];

useEffect(() => {
  const intervalId = setInterval(() => {
    const currentElement = heroImgChange[currentIndex3];
    if (currentElement) {
      currentElement.style.background = heroImgChangeArr[currentIndex3];
      currentIndex3 = (currentIndex3 + 1) % heroImgChangeArr.length;
    }
  }, 10000);

  return () => {
    // Clear the interval when the component unmounts to avoid memory leaks
    clearInterval(intervalId);
  };
}, [currentIndex3]);


  const slideCount = useBreakpointValue({ sm: 2, base: 1, md: 3, lg: 4 });
  const isDesktop = useBreakpointValue({ base: false, md: true, lg: true });
  return (
    <div className={styles.homepage}>
      <div className={styles.heroSection}>
        <div className={styles.contentContainer}>
          <h3 style={{ fontSize: "36px", color: "#fff" }}>
            <b>
              Quality products that elevate
              <br /> your standards of living and
              <br /> save you money.
            </b>
          </h3>
          <br />
          <br/>
          <button
            style={{
              padding: "5px 15px 5px 15px",
              color: "#fff",
              border: "1px solid #EB5E28",
            }}
            className={styles.heroButton}
            onClick={()=>{window.location.href = '/allproducts'}}
          >
            SHOP NOW
          </button>
        </div>
      </div>
      {/* Highlights */}
      <Grid
        templateColumns={{ base: "100%", md: "20% 80%", lg: "20% 80%" }}
        style={{ marginTop: "50px", marginBottom: "50px" }}
        className={styles.shopCategories}
      >
        <GridItem className={styles.cat_one}>
          <p>
            SHOP{" "}
            <span style={{ fontSize: "18px", color: "#EB5E28" }} id="products">
              {""}
            </span>
          </p>
          <p>Furnish your home with elegance and comfort.</p>
        </GridItem>
        <GridItem className={styles.cat_two}>
          <Swiper
            slidesPerView={slideCount}
            spaceBetween={20}
            autoplay={{
              delay: 1000,
            }}
            modules={[Navigation, Autoplay]}
            navigation={isDesktop}
            className="mySwiper"
            loop={true}
          >
            {randomProducts.map((ele) => (
              <SwiperSlide key={ele._id}>
                <Link to={"/products/" + ele._id}>
                  <Image
                    max-width={"100%"}
                    style={{
                      height: "auto",
                      aspectRatio: "3/2",
                      objectFit: "contain",
                    }}
                    src={baseUrl + ele.img1}
                    alt=""
                  />
                </Link>
                <p>{ele.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </GridItem>
      </Grid>
      {/* Studio Collections */}
      <Heading className={styles.h2}>Highlights</Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        className={styles.shopCollections}
      >
        <GridItem className={styles.shopCollectionsItems}>
          <Image src={baseUrl + highlights[0].img1} alt="" max-width={"100%"} style={{ height: "auto", aspectRatio: "3/2", objectFit: "contain",}} />
          <br/>
          <p>{highlights[0].title}</p>
          <p>Get upto Ksh{highlights[0].strike} Discount</p>
          <p>
            <Link className={styles.coll_link} to={'/products/' + highlights[0]._id}>
              Buy Now
            </Link>
          </p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            max-width={"100%"} style={{ height: "auto", aspectRatio: "3/2", objectFit: "contain",}}
            src={baseUrl + highlights[1].img1}
            alt=""
          />
          <br/>
          <p>{highlights[1].title}</p>
          <p>Get upto Ksh{highlights[1].strike} Discount</p>
          <p>
            <Link className={styles.coll_link} to={'/products/' + highlights[1]._id}>
              Buy Now
            </Link>
          </p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            max-width={"100%"} style={{ height: "auto", aspectRatio: "3/2", objectFit: "contain",}}
            src={baseUrl + highlights[2].img1}
            alt=""
          />
          <br/>
          <p>{highlights[2].title}</p>
          <p>
            Get upto Ksh{highlights[2].strike} Discount
          </p>
          <p>
            <Link className={styles.coll_link} to={'/products/' + highlights[2]._id}>
              Buy Now
            </Link>
          </p>
        </GridItem>
      </Grid>
      <Box className={styles.firstHomeItem}>
        <Image src={heroImg} id={styles.heroimg} alt="" />
      </Box>
      {/* New Arrivals */}
      <div className={styles.shopCategories}>
        <div className={styles.cat_one}>
          <p>NEW ARRIVALS</p>
          <p>Check out our newest launches.</p>
        </div>
        <div className={styles.cat_two}>
          <Swiper
            slidesPerView={slideCount}
            spaceBetween={20}
            autoplay={{
              delay: 1000,
            }}
            modules={[Navigation, Autoplay]}
            navigation={isDesktop}
            className="mySwiper"
            loop={true}
          >
            {newArrivals.map((ele, i) => (
              <SwiperSlide key={i}>
                <Image
                 max-width={"100%"}
                 style={{
                   height: "auto",
                   aspectRatio: "3/2",
                   objectFit: "contain",
                 }}
                 src={ele.url} alt="" />
                <p style={{ fontSize: "14px", color: "gray" }}>{ele.color}</p>
                <p>{ele.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={"10"}
        className={styles.shopCollections}
      >
        <GridItem className={styles.shopCollectionsItems}>
        <Link className={styles.coll_link} to="/">
        
          <Image
            src={groceries}
            alt=""
          />
          <p className={styles.linkText}>Groceries</p>
        </Link>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Link className={styles.coll_link} to="/">
            <Image
              src={foodDelivery}
              alt=""
            />
            <p className={styles.linkText}>Order in</p>
          </Link>
        </GridItem>
      </Grid>

      {/* Collections 
      <Heading className={styles.h2}>COLLECTIONS</Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        className={styles.shopCollections}
      >
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            src="https://images.dailyobjects.com/marche/assets/images/other/collection-08-01.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1"
            alt=""
          />
          <p>Home Decor</p>
          <p>
            Features a range of chroniclers that let you preserve all brief
            encounters on your journey.
          </p>
          <p>
            <Link className={styles.coll_link} to="/">
              Shop Now
            </Link>
          </p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            src="https://images.dailyobjects.com/marche/assets/images/other/zootopia-Web.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1"
            alt=""
          />
          <p>Home Furniture</p>
          <p>
            A playful and functional range of indoor desk and storage solutions
            for children.
          </p>
          <p>
            <Link className={styles.coll_link} to="/">
              Shop Now
            </Link>
          </p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            src="https://images.dailyobjects.com/marche/assets/images/other/collection-tarp.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1"
            alt=""
          />
          <p>Home Appliances</p>
          <p>
            Urban-inspired carriers, made for free-spirited and powerful
            wearers.
          </p>
          <p>
            <Link className={styles.coll_link} to="/">
              Shop Now
            </Link>
          </p>
        </GridItem>
      </Grid>
      */}

      <div className={styles.homeItems}>
        <Image
          src={interiorDesign}
          alt=""
        />
      </div>

      {/* Our Story */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap="50"
        className={styles.ourStory}
      >
        <GridItem>
          <h2 className={styles.h1}>OUR STORY</h2>
          <p>
          Dobiri is a comprehensive e-commerce website that offers a 
          wide range of products, including furniture, groceries, liquor,
           vape, home appliances, and food delivery services. Our primary 
           focus is on providing convenient and accessible shopping experiences
            for university students who lead busy lives. 
          </p>
          <p>
          Our platform provides
             a user-friendly interface that allows customers to shop from the
              comfort of their homes and get their orders delivered to their 
              doorstep in a timely and efficient manner. Our goal is to 
              simplify the shopping process while providing quality products 
              at affordable prices.
          </p>
          <p>
            {/*<Link className={styles.coll_link} to="/">
              Read More
      </Link>*/}
          </p>
        </GridItem>
        <GridItem>
          <Image
            style={{ marginTop: "1.2rem" }}
            src="https://images.dailyobjects.com/marche/assets/images/other/Our-Story-updated01.jpg?tr=cm-pad_crop,v-2,w-788,dpr-1"
            alt=""
          />
        </GridItem>
      </Grid>
      <br />
      <hr />

      {/* dobiri Official */}
      <Official />
    </div>
  );
};

export default Homepage;
