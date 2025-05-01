import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieContainer from "../Components/Layouts/Home/MovieContainer";
import MainCarousel from "../Components/Layouts/Home/MainCarousel";

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <MainCarousel/>
        <MovieContainer/>
        <Footer />
      </>
    );
  }
}

export default Home;
