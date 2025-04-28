import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import Slider from "../Components/Layouts/Home/Slider";
import { topRated } from "../Components/Layouts/Home/MovieDetails";
import MovieCarouselHome from "../Components/Layouts/Movies/MovieCarouselHome";

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Slider items={topRated}/>
        <MovieCarouselHome/>
        <Footer />
      </>
    );
  }
}

export default Home;
