import { useEffect } from "react";
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

const shopCategories = [
  { id: 1, url: Chairs, title: "Chairs" },
  { id: 2, url: Sofas, title: "Sofas" },
  { id: 3, url: Desk, title: "Desks" },
  { id: 4, url: Tables, title: "Tables" },
  { id: 5, url: Liquor, title: "Liquor" },
  {
    id: 6,
    url: "https://images.dailyobjects.com/marche/assets/images/other/backpack-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Backpack",
  },
  {
    id: 7,
    url: "https://images.dailyobjects.com/marche/assets/images/other/deskmat-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title: "Desk Mat",
  },
  { id: 8, url: Shoerack, title: "Shoerack" },
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

  var product = document.getElementById("products");
  var heroImgItem = document.getElementById("heroimg");
  let currentIndex = 0;
  let currentIndex2 = 0;

  setInterval(() => {
    product.textContent = products[currentIndex];
    currentIndex = (currentIndex + 1) % products.length;
  }, 3000);

  setInterval(() => {
    heroImgItem.src = heroImgArray[currentIndex2];
    currentIndex2 = (currentIndex2 + 1) % heroImgArray.length;
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

  setInterval(() => {
    heroImgChange.style.background = heroImgChangeArr[currentIndex3];
    currentIndex3 = (currentIndex3 + 1) % heroImgChangeArr.length;
  }, 10000);

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
            {shopCategories.map((ele) => (
              <SwiperSlide key={ele.id}>
                <Link to={ele.title}>
                  <Image
                    max-width={"100%"}
                    style={{
                      height: "auto",
                      aspectRatio: "3/2",
                      objectFit: "contain",
                    }}
                    src={ele.url}
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
          <Image src={topDrink} alt="" max-width={"100%"} style={{ height: "auto", aspectRatio: "3/2", objectFit: "contain",}} />
          <br/>
          <p>Drinks</p>
          <p>Keep the party going!</p>
          <p>
            <Link className={styles.coll_link} to="/liquor">
              Shop Now
            </Link>
          </p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            max-width={"100%"} style={{ height: "auto", aspectRatio: "3/2", objectFit: "contain",}}
            src={vape}
            alt=""
          />
          <br/>
          <p>Vape</p>
          <p>The fun you wouldn't miss</p>
          <p>
            <Link className={styles.coll_link} to="/vape">
              Shop Now
            </Link>
          </p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image
            max-width={"100%"} style={{ height: "auto", aspectRatio: "3/2", objectFit: "contain",}}
            src={stickers}
            alt=""
          />
          <br/>
          <p>Stickers</p>
          <p>
            A reflection of modern culture. Get awesome stickers for your phone.
          </p>
          <p>
            <Link className={styles.coll_link} to="/stickers">
              Shop Now
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
