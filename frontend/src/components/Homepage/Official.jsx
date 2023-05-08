import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Homepage.module.css";
import { Autoplay, EffectCoverflow } from "swiper";
import { Image } from "@chakra-ui/react";

const officialArr = [
  {
    url:
      "https://i.pinimg.com/564x/d5/82/b9/d582b9ac0dcf41beb54d26e0c76e14c8.jpg"
  },
  {
    url:
      "https://i.pinimg.com/236x/9d/ec/e1/9dece17840951e779c7750d787a6910d.jpg"
  },
  {
    url:
      "https://i.pinimg.com/236x/47/31/2b/47312b46b98caf172c77676e21ab3431.jpg"
  },
  {
    url:
      "https://i.pinimg.com/236x/1e/4b/21/1e4b21a8a99871adf86740649b8f8b0d.jpg"
  },
  {
    url:
      "https://i.pinimg.com/236x/2d/ba/46/2dba46f56d026626f003018829b624e3.jpg"
  },
  {
    url:
      "https://i.pinimg.com/236x/43/ae/b3/43aeb3760bd8352471cd040c2347d566.jpg"
  },
  {
    url:
      "https://i.pinimg.com/564x/6e/88/29/6e8829911c36fe7fbaa8bd1baf95806f.jpg"
  },
  {
    url:
      "https://i.pinimg.com/564x/9e/e3/e8/9ee3e81bb9bedf728f15453538a9ee43.jpg"
  },
  {
    url:
      "https://i.pinimg.com/564x/ff/49/bd/ff49bd5ee8e854b11ac5724bce6c77fb.jpg"
  },
  {
    url:
      "https://i.pinimg.com/564x/fb/f9/2b/fbf92b1250a8f47d1c679fad6d82f1d6.jpg"
  },
  {
    url:
      "https://i.pinimg.com/564x/0b/ce/bd/0bcebdeb6c57cc5e2610c690e57b9689.jpg"
  },
  {
    url:
      "https://i.pinimg.com/564x/f2/ed/8a/f2ed8ad6bc21397b064a7688b2bc9d3e.jpg"
  }
];

const Official = () => {
  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <div className={styles.official}>
        <p className={styles.h2}>@Dobiri_official</p>
        <div>
          <Swiper
            autoplay={{
              delay: 500
            }}
            slidesPerView={"4"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            effect={"coverflow"}
            modules={[EffectCoverflow, Autoplay]}
            className="mySwiper"
            loop={true}
          >
            {officialArr.map((ele, i) =>
              <SwiperSlide key={i}>
                <Image width={"100%"} src={ele.url} alt="" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
      <br />
      <hr />
      {/* 
      <div>
        <p
          style={{ margin: "2.5rem 0rem", textAlign: "center" }}
          className={styles.h2}
        >
          FEATURED IN
        </p>
        <img
          style={{ margin: "2.5rem 0rem" }}
          src="https://images.dailyobjects.com/marche/icons/press-desktop.png?tr=cm-pad_resize,v-2,w-1349,h-200,dpr-1"
          alt=""
        />
      </div>
    */}
      <br />
      <hr />
      {/* some more */}
      <p
        style={{ margin: "2.5rem 0rem", textAlign: "center" }}
        className={styles.h2}
      >
        GET EXCLUSIVE ACCESS TO NEW PRODUCTS, DEALS & SURPRISE TREATS
      </p>
      <div className={styles.input}>
        <input type="text" placeholder="Enter Your Email" />
        <p>
          <button>SUBSCRIBE</button>
        </p>
      </div>
      <div className={styles.fhm}>
        <div className={styles.fhmItem}>
          <img
            src="https://images.dailyobjects.com/marche/icons/social/quick-delivery.svg?tr=cm-pad_resize,v-2,w-40,h-40,dpr-1"
            alt=""
          />
          <p>Quick Delivery</p>
        </div>
        <div className={styles.fhmItem}>
          <img
            src="https://images.dailyobjects.com/marche/icons/social/easy-returns.svg?tr=cm-pad_resize,v-2,w-40,h-40,dpr-1"
            alt=""
          />
          <p>Easy Returns</p>
        </div>
        <div className={styles.fhmItem}>
          <img
            src="https://images.dailyobjects.com/marche/icons/social/quality-assured.svg?tr=cm-pad_resize,v-2,w-40,h-40,dpr-1"
            alt=""
          />
          <p>Quality Assured</p>
        </div>
      </div>
    </div>
  );
};

export default Official;
