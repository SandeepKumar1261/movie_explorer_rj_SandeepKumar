import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
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
  const [userData, setUserData] = useState<{ name: string; role: string } | null>(null);
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

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <AppBar position="static" sx={{ backgroundColor: "black", boxShadow: 3 }}>
      <Toolbar
        sx={{
          maxWidth: "1580px",
          width: "100%",
          mx: { sx: "2%", xs: "2%", md: "3%", lg: "1%" },
          display: "flex",
          justifyContent: "space-between",
          gap: { xs: 1, sm: 2, md: 3, lg: 20 },
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "red",
            fontWeight: "bold",
            fontSize: { xs: "0.8rem", sm: "1.8rem", md: "1.8rem" },
            fontFamily: "sans-serif",
          }}
        >
          MOVIE EXPLORER
        </Typography>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: { xs: 1.5, lg: 3 },
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
            gap: { xs: 0.6, sm: 2, md: 3, lg: 4 },
            position: "relative",
            right: "1%",
            ml: { xs: "0%", sm: "0%", md: "10%", lg: "10%" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton onClick={toggleProfileCard} sx={{ color: "white" }}>
              <FaUserCircle size={25} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              {isLoggedIn
                ? userData?.role === "supervisor"
                  ? "Supervisor"
                  : userData?.name || "User"
                : "Guest"}
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton onClick={toggleMenu} sx={{ color: "white" }}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </IconButton>
          </Box>

          {/* <Menu
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
            <MenuItem onClick={handleLogout}>
              <Button variant="contained" color="error" fullWidth>
                Logout
              </Button>
            </MenuItem>
          </Menu> */}
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
    <MenuItem onClick={() => {
      setShowProfile(false);
      setAnchorEl(null);
      navigate("/admin");
    }}>
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

      {isOpen && (
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            gap: 2,
            px: 2,
            pb: 2,
            fontFamily: "serif",
            fontSize: "1rem",
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { color: "red", textDecoration: "underline" },
            }}
            onClick={toggleMenu}
          >
            Home
          </Typography>
          <Typography
            component={Link}
            to="/movies"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { color: "red", textDecoration: "underline" },
            }}
            onClick={toggleMenu}
          >
            Movies
          </Typography>
          <Typography
            component={Link}
            to="/genres"
            sx={{
              textDecoration: "underline",
              color: "inherit",
              "&:hover": { color: "red", textDecoration: "underline" },
            }}
            onClick={toggleMenu}
          >
            Genres
          </Typography>
          <Typography
            component={Link}
            to="/myWishlist"
            sx={{
              textDecoration: "underline",
              color: "inherit",
              "&:hover": { color: "red", textDecoration: "underline" },
            }}
            onClick={toggleMenu}
          >
            My List
          </Typography>
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
