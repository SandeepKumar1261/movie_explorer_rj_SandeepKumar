import React, { Component } from "react";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import AdminPanel from "../Components/Admin/AdminPanel";

class Admin extends Component {
  render() {
    return (
      <>
        <Navbar />
        <AdminPanel/>
        <Footer />
      </>
    );
  }
}

export default Admin;
