import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import 'react-toastify/dist/ReactToastify.css';
import Moviedetails from "./Pages/Moviedetails";
import Movies from "./Pages/Movies";
import Genre from "./Pages/Genre";
import WishList from "./Pages/WishList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movie/:movieId" element={<Moviedetails/>} />
        <Route path="/genres" element={<Genre/>} />
        <Route path="/myWishlist" element={<WishList />} />

      </Routes>
    </Router>
  );
}

export default App;
