import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieContainer from "../Components/Layouts/Movies/MovieContainer";

class Movies extends Component {
  render() {
    return (
      <>
        <Navbar />
        <MovieContainer/>
        <Footer />
      </>
    );
  }
}

export default Movies;
