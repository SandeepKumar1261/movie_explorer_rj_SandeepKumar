import React from "react";
import MainCarousel from "./MainCarousel";
import HomeCarousel from "./HomeCarousel";
const MovieContainer = () => {
  return (
    <>
    <MainCarousel/>
    <HomeCarousel genre={"Top Rated"}/>
    <HomeCarousel genre={"Latest Released"}/>
    </>
  );
};

export default MovieContainer;