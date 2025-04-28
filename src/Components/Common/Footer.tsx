import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Box, Typography, Grid, Link as MuiLink, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#0C0F14",
        color: "white",
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Grid container spacing={{ xs: 2, sm: 4, md: 12, lg: 16, xl: 10 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              MovieExplorer
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Discover movies, explore trending trailers, and find what to watch
              next.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                href="/"
                underline="hover"
                sx={{
                  color: "gray",
                  "&:hover": { color: "red" },
                  fontSize: "1.2rem",
                }}
              >
                Home
              </MuiLink>
              <MuiLink
                href="/movies"
                underline="hover"
                sx={{
                  color: "gray",
                  "&:hover": { color: "red" },
                  fontSize: "1.2rem",
                }}
              >
                Movies
              </MuiLink>
              <MuiLink
                href="/genres"
                underline="hover"
                sx={{
                  color: "gray",
                  "&:hover": { color: "red" },
                  fontSize: "1.2rem",
                }}
              >
                Genre
              </MuiLink>
              <MuiLink
                href="/watchlist"
                underline="hover"
                sx={{
                  color: "gray",
                  "&:hover": { color: "red" },
                  fontSize: "1.2rem",
                }}
              >
                Contact
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              <MuiLink
                href="#"
                sx={{ color: "gray", "&:hover": { color: "red" } }}
              >
                <FaFacebook />
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "gray", "&:hover": { color: "red" } }}
              >
                <FaTwitter />
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "gray", "&:hover": { color: "red" } }}
              >
                <FaInstagram />
              </MuiLink>
              <MuiLink
                href="#"
                sx={{ color: "gray", "&:hover": { color: "white" } }}
              >
                <FaYoutube />
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: "gray" }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "gray", fontSize: "1.2rem" }}
        >
          © {new Date().getFullYear()} MovieExplorer. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
