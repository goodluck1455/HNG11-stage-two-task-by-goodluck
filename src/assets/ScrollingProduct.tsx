import {  useState } from "react";
import "../assets/component styles/scrollingProduct.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { fadeIn } from "../Variant";
import { motion } from "framer-motion";


// import KswissHeel from "../images/Group 18.png"
import{ priceData4ScrollingPage } from "../assets/PriceData"
import TimeCounter from "./TimeCounter";

function ScrollingProduct() {

  const [priceData]= useState(priceData4ScrollingPage);


 

  const currencyPrice = (newPrice:string)=>{
    const PriceNumber = parseFloat(newPrice.replace(/[^0-9.-]+/g, ""));
    return PriceNumber.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });}


  const priceDataElement = 
    priceData.map(price =>(
      <SwiperSlide key={price.id}>
      <div className="imageSlider--container">
       <div className="imageSlider----sales"><p>SALES</p></div> 
                <div className="imageSlide--A">
                  <img src={price.Image} alt="" />
                </div>
                <p className="scrollingPage---productName">{price.productName}</p>
                <span className="scrollingPage--cartBal">{price.itemContainer}</span> <br />
                <span className="Scrolling--Oldprice">{currencyPrice(price.oldPrice)}</span> <span className="Scrolling--NewPrice">{currencyPrice(price.newPrice)}</span>
                </div>
                </SwiperSlide>
    ))
  

    return (
      <>
     <motion.div
     variants={fadeIn("right", 0.2)}
     initial="hidden"
     whileInView={"show"}
    //  viewport={{ once: false, amount: 0.3 }}
     >
        <div className="scrolingPage--container">
            <div className="scrolingPage---deals">
               <div>
                <h3>Today Best Deals!</h3>
               </div>
               <TimeCounter duration={5 * 22 * 60 * 60 * 1000}
               media="defaultView"
               />
               {/* <div className="ScrollingPage---timeCountDown">
                <p>Ends in: {12}h : {10}m : {10}s</p>
               </div> */}

            </div>

            <div className="ScrollingPage---imagesContainer">

            <Swiper
            spaceBetween={50}
            slidesPerView={5.4}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            modules={[Navigation]}

            breakpoints={{
              375: {
                slidesPerView: 1.5,
                spaceBetween: -20,
              },
              360: {
                slidesPerView: 1.5,
                spaceBetween: -20,
              },
              320: {
                slidesPerView: 1.5,
                spaceBetween: -40,
              },
              480: {
                slidesPerView: 2.5,
                spaceBetween: 40,
              },
              568: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              540: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              736: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },

              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
            }}
          >
            {priceDataElement}
          </Swiper>

          <div className="custom-next"><MdKeyboardDoubleArrowLeft  /></div>
          <div className="custom-prev"><MdKeyboardDoubleArrowRight /></div>


{/* 
                   {priceDataElement} */}
                {/* <div className="imageSlider--container">
                <div className="imageSlide--A">
                  <img src={KswissHeel} alt="" />
                </div>
                <p className="scrollingPage---productName">K-swiss Heel</p>
                <span className="scrollingPage--cartBal">10 items left</span> <br />
                <span className="Scrolling--Oldprice">$40,000</span> <span className="Scrolling--NewPrice">$20,000</span>
                </div> */}
            </div>

            <div>

            </div>


        </div>
     </motion.div>
      </>
    )
  }
  
  export default ScrollingProduct






// converting it to naira currency
  // const currencyOldPrice = (oldPrice:string)=>{
  //   const oldPriceNumber = parseFloat(oldPrice.replace(/[^0-9.-]+/g, ""));
  //   return oldPriceNumber.toLocaleString("en-NG", {
  //   style: "currency",
  //   currency: "NGN",
  //   minimumFractionDigits: 0,
  // });}