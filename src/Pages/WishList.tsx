import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import WishListPage from "../Components/Layouts/WishList/WishList";

class WishList extends Component {
  render() {
    return (
      <>
        <Navbar />
        <WishListPage/>
        <Footer />
      </>
    );
  }
}

export default WishList;
