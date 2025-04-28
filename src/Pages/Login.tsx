import React, { Component } from 'react';
import Navbar from '../Components/Common/Navbar';
import Loginform from '../Components/Layouts/Auth/Loginform';
import Footer from '../Components/Common/Footer';

class Login extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Loginform />
        <Footer />
      </>
    );
  }
}

export default Login;
