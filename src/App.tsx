import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Moviedetails from "./Pages/Moviedetails";
import Movies from "./Pages/Movies";
import Genre from "./Pages/Genre";
import Subscription from "./Pages/Subscription.tsx";
import PublicRoute from "./Utils/Publicroute.tsx";
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./Pages/Admin.tsx";
import { generateToken, messaging } from "./Notification/firebase.ts";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import ScrollToTop from "./Utils/ScrollTop.tsx";
import WishList from "./Pages/WishList.tsx";
import SubscriptionPlans from "./Components/Layouts/Subscription/SubscriptionPlans.tsx";
import Success from "./Components/Layouts/Subscription/Success.tsx";

  
function App() {
  useEffect(() => {
    generateToken();

    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      if (Notification.permission === 'granted') {
        const notificationTitle = payload.notification?.title || 'New Notification';
        const notificationOptions = {
          body: payload.notification?.body || 'You have a new message',
          icon: payload.notification?.image || '/favicon.ico'
        };
        new Notification(notificationTitle, notificationOptions);
      }
    });
  }, []);

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:movieId" element={<Moviedetails />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/wishlist" element={<WishList/>} />
        <Route path="/success" element={<Success/>} />



      </Routes>
    </Router>
  );
}

export default App;
