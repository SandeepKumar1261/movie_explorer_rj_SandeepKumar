import React from "react";
import HomeCarousel from "./Homecarousel";
const MovieContainer = () => {
  return (
    <>
    <HomeCarousel genre={"Top Rated"}/>
    <HomeCarousel genre={"Latest Released"}/>
    </>
  );
};

export default MovieContainer;
