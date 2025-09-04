import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {
  const [currentSLide, setCurrentSLide] = useState(0);
  const slideLength = sliderData.length;
  // console.log(slideLength);

  const autoScroll = true
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSLide(currentSLide === slideLength - 1 ? 0 : currentSLide + 1);
  };

  const prevSlide = () => {
    setCurrentSLide(currentSLide === 0 ? slideLength - 1 : currentSLide - 1);
  };

  useEffect(() => {
    setCurrentSLide(0)
  }, []);


  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSLide, slideInterval, autoScroll]);


  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div key={index} className={index === currentSLide ? "slide current" : "slide"}>

            {index === currentSLide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className='--btn --btn-primary'>
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Slider;
