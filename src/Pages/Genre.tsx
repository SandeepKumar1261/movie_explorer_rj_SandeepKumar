import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieCarousel from "../Components/Layouts/Genre/MovieCarousel";

class Genre extends Component {
  render() {
    return (
      <>
        <Navbar />
        {/* <MovieCarousel /> */}
        <MovieCarousel genre={"Action"} />
        <MovieCarousel genre={"Adveture"} />
        <MovieCarousel genre={"Action"} />
        <MovieCarousel genre={"Action"} />

        <Footer />
      </>
    );
  }
}

export default Genre;
