import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import AllMovies from "../Components/Layouts/Movie/Movies";
class Movies extends Component {
  render() {
    return (
      <>
        <Navbar />
        <AllMovies/>
        <Footer />
      </>
    );
  }
}

export default Movies;
