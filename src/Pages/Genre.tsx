import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieCarousel from "../Components/Layouts/Genre/MovieCarousel";

class Genre extends Component {
  render() {
    return (
      <>
        <Navbar />
        <MovieCarousel genre={"Action"} />
        <MovieCarousel genre={"Romance"} />
        <MovieCarousel genre={"Thriller"} />
        <MovieCarousel genre={"Si-Fi"} />
        <Footer />
      </>
    );
  }
}

export default Genre;
