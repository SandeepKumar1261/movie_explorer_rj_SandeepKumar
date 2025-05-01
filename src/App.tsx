import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import 'react-toastify/dist/ReactToastify.css';
import Moviedetails from "./Pages/Moviedetails";
import Movies from "./Pages/Movies";
import Genre from "./Pages/Genre";
import Subscription from "./Pages/Subscription";
import AdminPanel from "./Components/Admin/AdminPanel";

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
        <Route path="/Subscription" element={<Subscription/>} />
        <Route path="/admin" element={<AdminPanel/>} />

      </Routes>
    </Router>
  );
}

export default App;
