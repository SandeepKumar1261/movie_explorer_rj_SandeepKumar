import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaBell } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const navigate = useNavigate();
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserData(user);
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const toggleProfileCard = (event: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
      setShowProfile((prev) => !prev);
    } else {
      toast.success("Please log In");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfile(false);
    setAnchorEl(null);
    navigate("/");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowProfile(false);
  };

  return (
    <>
      <AppBar position="static" sx={{margin:"0", backgroundColor: "black", boxShadow: 3 }}>
        <Toolbar
          sx={{
            maxWidth: "1580px",
            width: "100%",
            mx: { sx: "0", xs: "0", md: "3%", lg: "1%" },
            display: "flex",
            justifyContent: {xs:"space-evenly",sm:"space-between"},
            gap: { xs: 0, sm: 2, md: 3, lg: 20 },
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              marginLeft:"0",
              textDecoration: "none",
              color: "red",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1.8rem", md: "1.8rem" },
              fontFamily: "sans-serif",
            }}
          >
            MOVIE EXPLORER
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: { xs: 1, lg: 3 },
              fontFamily: "sans-serif",
              fontSize: { xs: "1rem", lg: "1.25rem" },
            }}
          >
            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                "&:hover": { color: "red" },
              }}
            >
              Home
            </Typography>
            <Typography
              component={Link}
              to="/movies"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                "&:hover": { color: "red" },
              }}
            >
              Genre
            </Typography>
            <Typography
              component={Link}
              to="/subscription"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                "&:hover": { color: "red" },
              }}
            >
              Subscription
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.1, sm: 2, md: 3, lg: 4 },
              position: "relative",
              right: "1%",
              ml: { xs: "0%", sm: "0%", md: "10%", lg: "10%" },
            }}
          >
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={toggleProfileCard} sx={{ color: "white" }}>
                <FaUserCircle size={25} />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  // fontWeight: "bold",
                  fontFamily: "sans-serif",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {isLoggedIn ? userData?.name || "User" : "Guest"}
              </Typography>
            </Box> */}
            <Box sx={{ display: "flex", alignItems: "center", gap:{xs:0.3,sm:1} }}>
  <IconButton sx={{ color: "red" }}>
    <FaBell size={20} />
  </IconButton>
  <IconButton onClick={toggleProfileCard} sx={{ color: "white" }}>
    <FaUserCircle size={20} />
  </IconButton>
  <Typography
    variant="body2"
    sx={{
      color: "white",
      fontFamily: "sans-serif",
      display: { xs: "none", sm: "block" },
    }}
  >
    {isLoggedIn ? userData?.name || "User" : "Guest"}
  </Typography>
</Box>


            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton onClick={toggleMenu} sx={{ color: "white" }}>
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={showProfile && isLoggedIn}
              onClose={handleMenuClose}
              ref={profileCardRef}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled sx={{ fontWeight: "bold" }}>
                👤 Logged In
              </MenuItem>

              {userData?.role === "supervisor" && (
                <MenuItem
                  onClick={() => {
                    setShowProfile(false);
                    setAnchorEl(null);
                    navigate("/admin");
                  }}
                >
                  <Button variant="contained" color="primary" fullWidth>
                    Add Movie
                  </Button>
                </MenuItem>
              )}

              <MenuItem onClick={handleLogout}>
                <Button variant="contained" color="error" fullWidth>
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Overlay for outside click */}
      {isOpen && (
        <Box
          onClick={toggleMenu}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1200,
            display: { xs: "block", sm: "none" },
          }}
        />
      )}

      {/* Sidebar for Mobile */}
      <Box
        sx={{
          position: "fixed",
          top: "64px", // Adjust this based on your AppBar height
          right: 0,
          width: "70%",
          backgroundColor: "black",
          zIndex: 1300,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          gap: 3,
          px: 3,
          py: 4,
          borderRadius: "0 0 0 10px",
          overflowY: "auto",
          height: "auto",
          maxHeight: "90vh",
        }}
      >
        <Typography
          component={Link}
          to="/"
          onClick={toggleMenu}
          sx={{
            textDecoration: "none",
            color: "white",
            fontSize: "1rem",
            "&:hover": { color: "red", textDecoration: "underline" },
          }}
        >
          Home
        </Typography>
        <Typography
          component={Link}
          to="/movies"
          onClick={toggleMenu}
          sx={{
            textDecoration: "none",
            color: "white",
            fontSize: "1rem",
            "&:hover": { color: "red", textDecoration: "underline" },
          }}
        >
          Movies
        </Typography>
        <Typography
          component={Link}
          to="/genres"
          onClick={toggleMenu}
          sx={{
            textDecoration: "none",
            color: "white",
            fontSize: "1rem",
            "&:hover": { color: "red", textDecoration: "underline" },
          }}
        >
          Genres
        </Typography>
        <Typography
          component={Link}
          to="/myWishlist"
          onClick={toggleMenu}
          sx={{
            textDecoration: "none",
            color: "white",
            fontSize: "1rem",
            "&:hover": { color: "red", textDecoration: "underline" },
          }}
        >
          My List
        </Typography>
      </Box>
    </>
  );
};

export default Navbar;
