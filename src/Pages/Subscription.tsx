import React, { Component } from 'react';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';
import SubscriptionPlans from '../Components/SubscriptionPlans';

class Subscription extends Component {
  render() {
    return (
      <>
        <Navbar />
        <SubscriptionPlans/>
        <Footer />
      </>
    );
  }
}

export default Subscription;
