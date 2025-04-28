import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import MovieDetails from "../Components/Layouts/Moviedetails";

class Moviedetails extends Component {
  render() {
    return (
      <>
        <Navbar />
        <MovieDetails />
        <Footer />
      </>
    );
  }
}

export default Moviedetails;
