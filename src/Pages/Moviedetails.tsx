import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieDetails from "../Components/Layouts/Movie/Moviedetails";
import HomeCarousel from "../Components/Layouts/Home/Homecarousel";

class Moviedetails extends Component {
  render() {
    return (
      <>
        <Navbar />
        <MovieDetails />
        <HomeCarousel genre={"Related Movies"}/>
        <Footer />
      </>
    );
  }
}

export default Moviedetails;