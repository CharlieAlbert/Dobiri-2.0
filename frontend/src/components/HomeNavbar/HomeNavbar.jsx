import { HiOutlineShoppingBag } from "react-icons/hi";
import { ImUser } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import $ from 'jquery';

import "./HomeNavbar.css";
import { useBreakpointValue, Grid, GridItem } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";

//Images
import Logo from '../../Assets/Dobiri.png';
import Banner1 from '../../Assets/Banner1.png';
import Banner2 from '../../Assets/Banner2.png';

const HomeNavbar = () => {

  var images = [Banner1, Banner2]; // array of images
var currentIndex = 0; // current index of the image

var image = document.getElementById("myImage");

setInterval(() => {
  image.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}, 10000);

// Cache selected elements in variables
var $nav = $('.nav');
var $searchInput = $('.search-input');
var $menuToggle = $('.menu-toggle');
var $searchIcon = $('#search-icon');

$searchIcon.click(function() {
  // Toggle classes on cached elements
  $nav.toggleClass('search no-search');
  $searchInput.toggleClass('search-active');
});

$menuToggle.click(function() {
  // Toggle classes on cached element and clicked element
  $nav.toggleClass('mobile-nav');
  $(this).toggleClass('is-active');
});


  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();
  return (
    <div className="">
      <div class="nav-wrapper">
        <div class="grad-bar"></div>
        <nav class="navbar">
        <div onClick={() => navigate("/")} style={{ marginLeft: '20px'}} className="navIcon">
          <Link>
            <img
              src={Logo}
              alt=""
              style={{transform: 'scale(1.6)', marginLeft: '20px'}}
            />
          </Link>
        </div>
          <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <ul class="nav no-search">
                
            {isDesktop ? (
          <>
            <li class="nav-item"><a href="/Furniture">Furniture</a></li>
            <li class="nav-item"><a href="/HomeAppliances">Home&nbsp;Appliances</a></li>
            <li class="nav-item"><a href="/Stickers">Stickers</a></li>
            <li class="nav-item"><a href="/Liquor">Liquor</a></li>
            <li class="nav-item"><a href="/Vape">Vape</a></li>
            <li class="nav-item"><a href="/Groceries">Groceries</a></li>
            <li class="nav-item"><a href="/Orderfood">Order&nbsp;Food</a></li>
            <li class="nav-item navItemsSale"><a href="/blog">Blog</a></li>
            <HiOutlineShoppingBag size={20} id="nav-icon" className="nav-item" onClick={()=>navigate("/cart")} />
            <ImUser size={20} id="nav-icon" className="nav-item" onClick={() =>navigate("/login")} />
            <FiSearch size={20} className="nav-item" id="search-icon"/>
          </>
        ) : (
          <>
            <li class="nav-item"><a href="/login">Login</a></li>
            <li class="nav-item"><a href="/Furniture">Furniture</a></li>
            <li class="nav-item"><a href="/Home Appliances">Home&nbsp;Appliances</a></li>
            <li class="nav-item"><a href="/sale">Stickers</a></li>
            <li class="nav-item"><a href="/wallet">Liquor</a></li>
            <li class="nav-item"><a href="/Vape">Vape</a></li>
            <li class="nav-item"><a href="/bag">Groceries</a></li>
            <li class="nav-item"><a href="/watch">Order&nbsp;Food</a></li>
            <li class="nav-item navItemsSale"><a href="/blog">Blog</a></li>
            <li class="nav-item"><a href="/cart">Cart</a></li>        
          </>
        )}

            
            <div>
              <input type="text" class="search-input"  placeholder="search"/>
            </div>
          </ul>
        </nav>
      </div>

    {
      /*
      <div className={styles.navbar}>
        <div onClick={() => navigate("/")} className="navIcon">
          <Link>
            <img
              src={Logo}
              alt=""
            />
          </Link>
        </div>
          <div>
            <div className={styles.navItems}>
             
            </div>
          </div>
        <div className={styles.navUser}>
                
        </div>
      </div>

      */
    }  

      <Grid templateColumns={{ base: '100%', md: '40% 60%', lg: '40% 60%' }} className="availableOffer">
        <GridItem className="offerPercentage">
          <h1 className="offerH1">Get upto 10% off</h1>
          <span>by purchasing online</span>
        </GridItem>
        <GridItem className="offerValue">
          <img className="banner" src={Banner1} id='myImage' alt="banner_1"/>
        </GridItem>
      </Grid>
    </div>
  );
};

export default HomeNavbar;
