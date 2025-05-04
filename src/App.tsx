import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Moviedetails from "./Pages/Moviedetails";
import Movies from "./Pages/Movies";
import Genre from "./Pages/Genre";
import Subscription from "./Pages/SubscriptionPlans.tsx";
import PublicRoute from "./Components/Utils/Publicroute.tsx";
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./Pages/Admin.tsx";

function App() {
  return (
    <Router>
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
        <Route path="/genres" element={<Genre />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;
