import { Link } from 'react-router-dom'
import styles from './Homepage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Box, Grid, GridItem, Heading, Image, color, useBreakpointValue } from '@chakra-ui/react';
import Official from './Official';

//Images
import heroImg from '../../Assets/Hero.png';
import heroImg2 from '../../Assets/Hero2.png';
import Chairs from '../../Assets/3450 wood side Chair.jpg';
import Sofas from '../../Assets/L-shaped Sofa.jpg';
import Desk from '../../Assets/Study desk.jpg';
import Tables from '../../Assets/Generic Shee Nordic Rectangular coffee.jpg';
import Liquor from '../../Assets/DOWAX-0.jpg';
import Shoerack from '../../Assets/Shoerack acacia wood 5 shelves.jpg';
import topDrink from '../../Assets/weekly drink.png';

const shopCategories=[
  {id:1,
    url: Chairs,
    title:"Chairs"
  },
  {id:2,
    url: Sofas,
    title:"Sofas"
  },
  {id:3,
    url: Desk,
    title:"Desks"
  },
  {id:4,
    url: Tables,
    title:"Tables"
  },
  {id:5,
    url: Liquor,
    title:"Liquor"
  },
  {id:6,
    url: "https://images.dailyobjects.com/marche/assets/images/other/backpack-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title:"Backpack"
  },
  {id:7,
    url: "https://images.dailyobjects.com/marche/assets/images/other/deskmat-ups.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    title:"Desk Mat"
  },
  {id:8,
    url: Shoerack,
    title:"Shoerack"
  }
]

const newArrivals=[
  {
    url: "https://images.dailyobjects.com/marche/assets/images/other/group-6681.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    color:"Available in 6 Colors",
    title:"Pedal Backpack"
  },
  {
    url: "https://images.dailyobjects.com/marche/assets/images/other/group-6676.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    color:"Available in 2 Colors",
    title:"Clock & Dock"
  },
  {
    url: "https://images.dailyobjects.com/marche/assets/images/other/group-6679.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    color:"Available in 3 Colors",
    title:"Urban Briefcase"
  },
  {
    url: "https://images.dailyobjects.com/marche/assets/images/other/group-6680.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    color:"Available in 4 Colors",
    title:"Align Notebooks"
  },
  {
    url: "https://images.dailyobjects.com/marche/assets/images/other/group-6678.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    color:"Available in Black Colors",
    title:"Surge 4-in-1 Cable"
  },
  {
    url: "https://images.dailyobjects.com/marche/assets/images/other/group-6677.jpg?tr=cm-pad_crop,v-2,w-874,dpr-1",
    color:"Available in 9 Colors",
    title:"Macbook Cases"
  }
]



const Homepage = () => {

  //Shop products section
  var products = ['Furniture', 'Liquor', 'Home Appliances', 'Stickers', 'Groceries', 'Vape'];
  var heroImgArray = [heroImg, heroImg2];

  var product = document.getElementById('products');
  var heroImgItem = document.getElementById('heroimg');
  let currentIndex = 0;
  let currentIndex2 = 0;

  setInterval(() => {
    product.textContent =  products[currentIndex];
    currentIndex = (currentIndex + 1) % products.length;
  }, 3000);

  setInterval(() => {
    heroImgItem.src = heroImgArray[currentIndex2];
    currentIndex2 = (currentIndex2 + 1) % heroImgArray.length;
  }, 10000);

  //Hero section
  var heroImgChange = document.getElementsByClassName('heroSection');
  var currentIndex3 = 0;
  var heroImgChangeArr = ["url('../../Assets/furniture-living room.png')", "url('../../Assets/vegyimg.png')", "url('../../Assets/liquor-herosection.png')", "url('../../Assets/vape.png')"]

  setInterval(() => {
    heroImgChange.style.background = heroImgChangeArr[currentIndex3];
    currentIndex3 = (currentIndex3 + 1) % heroImgChangeArr.length;
  }, 10000);

  const slideCount = useBreakpointValue({ sm:2,base: 1,md:3,lg: 4 })
  const isDesktop = useBreakpointValue({ base: false,md:true, lg: true })
  return (
    <div className={styles.homepage}>
      <div className={styles.heroSection}>
        <div className={styles.contentContainer}>
          <h3 style={{fontSize: '36px', color: '#fff'}}><b>Quality products that elevate<br/> your standards of living and<br/> save you money.</b></h3>
          <br/>
          <button style={{padding: '5px 15px 5px 15px', color: '#fff', border: '1px solid #EB5E28'}} className={styles.heroButton}>SHOP NOW</button>
        </div>
      </div>
      {/* Highlights */}
      <Grid templateColumns={{ base: '100%', md: '20% 80%', lg: '20% 80%' }} style={{marginTop: '50px', marginBottom: '50px'}} className={styles.shopCategories}>
        <GridItem className={styles.cat_one}>
          <p>SHOP <span style={{fontSize: '18px', color: '#EB5E28'}} id='products'>{''}</span></p>
          <p>Furnish your home with elegance and comfort.</p>
        </GridItem>
        <GridItem className={styles.cat_two}>
        <Swiper
              slidesPerView={slideCount}
              spaceBetween={20}
              autoplay={{
                delay: 1000,
              }}
              modules={[Navigation,Autoplay]}
              navigation={isDesktop}
              className="mySwiper"
              loop={true}
            >
              {shopCategories.map((ele) => (
                <SwiperSlide key={ele.id}>
                  <Link to={ele.title}>
                    <Image max-width={"100%"} style={{height: 'auto', aspectRatio: '3/2', objectFit: 'contain'}} src={ele.url} alt="" />
                  </Link>
                  <p>{ele.title}</p>
                </SwiperSlide>
              ))}
            </Swiper>
        </GridItem>
      </Grid>
       {/* Studio Collections */}
       <Heading className={styles.h2}>Highlights</Heading>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} className={styles.shopCollections}>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src={topDrink} alt="" />
          <p>Drink of the week</p>
          <p>Get a taste of the weeks top selling drink!</p>
          <p><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/zodiac-collections.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1" alt="" />
          <p>Deal of the week</p>
          <p>Buy items worth Ksh1500+ and get a 20% discount</p>
          <p><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/pixel-banner-4-02.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1" alt="" />
          <p>Trending</p>
          <p>A reflection of modern pop-culture, this collection has a vintage appeal that evokes nostalgia.</p>
          <p ><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
      </Grid>
      <Box className={styles.firstHomeItem}>
        <Image src={heroImg} id='heroimg' alt="" />
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
              modules={[Navigation,Autoplay]}
              navigation={isDesktop}
              className="mySwiper"
              loop={true}
            >
              {newArrivals.map((ele,i) => (
                <SwiperSlide key={i}>
                  <Image width={"100%"} src={ele.url} alt="" />
                  <p style={{fontSize:"14px",color:"gray"}}>{ele.color}</p>
                  <p>{ele.title}</p>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
      </div>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={'10'} className={styles.shopCollections}>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/charging-ssolution.jpg?tr=cm-pad_crop,v-2,w-621,dpr-1" alt="" />
          <p>Groceries</p>
          <p><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/work-eessentials.jpg?tr=cm-pad_crop,v-2,w-621,dpr-1" alt="" />
          <p>Order in</p>
          <p><Link className={styles.coll_link} to='/'>Order now</Link></p>
        </GridItem>
      </Grid>

      {/* Collections */}
      <Heading className={styles.h2}>COLLECTIONS</Heading>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} className={styles.shopCollections}>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/collection-08-01.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1" alt="" />
          <p>08:01 COLLECTION</p>
          <p>Features a range of chroniclers that let you preserve all brief encounters on your journey.</p>
          <p><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/zootopia-Web.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1" alt="" />
          <p>DAILYOBJECTS X SMARTSTERS</p>
          <p>A playful and functional range of indoor desk and storage solutions for children.</p>
          <p><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
        <GridItem className={styles.shopCollectionsItems}>
          <Image src="https://images.dailyobjects.com/marche/assets/images/other/collection-tarp.jpg?tr=cm-pad_crop,v-2,w-421,dpr-1" alt="" />
          <p>TARP COLLECTION</p>
          <p>Urban-inspired carriers, made for free-spirited and powerful wearers.</p>
          <p ><Link className={styles.coll_link} to='/'>Shop Now</Link></p>
        </GridItem>
      </Grid>
      <div className={styles.homeItems}>
        <Image src="https://images.dailyobjects.com/marche/assets/images/other/organisers-desktops.jpg?tr=cm-pad_crop,v-2,w-1349,dpr-1" alt="" />
      </div>
      <div className={styles.homeItems}>
        <Image src="https://images.dailyobjects.com/marche/assets/images/other/corporate-gifting-desktops.jpg?tr=cm-pad_crop,v-2,w-1349,dpr-1" alt="" />
      </div>
      
      {/* Our Story */}
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap="50" className={styles.ourStory}>
        <GridItem>
          <h2 className={styles.h1}>OUR STORY</h2>
          <p>Founded in 2012, DailyObjects is a design-obsessed lifestyle accessories brand committed to making your everyday carry #lessordinary.</p>
          <p>You can look forward to a carefully-crafted range of products, made from long-lasting materials, with designs that stand out and make your life easy. With DailyObjects, let your lifestyle reflect your sensibilities as you go on to make your every day #lessordinary.</p>
          <p ><Link className={styles.coll_link} to='/'>Read More</Link></p>
        </GridItem>
        <GridItem>
          <Image style={{marginTop:"1.2rem"}} src="https://images.dailyobjects.com/marche/assets/images/other/Our-Story-updated01.jpg?tr=cm-pad_crop,v-2,w-788,dpr-1" alt=''/>
        </GridItem>
      </Grid>
      <br />
      <hr />

      {/* dailyObjects Official */}
      <Official/>
      
    </div>
  )
}

export default Homepage