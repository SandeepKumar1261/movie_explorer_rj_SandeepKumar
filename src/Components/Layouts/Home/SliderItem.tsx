import React from "react";
import { Box, Button, Typography, Fade } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Episode } from "./MovieDetails";
import bgImage from "../../../assets/backgr.webp";

interface SliderItemProps {
  episode: Episode;
  isActive: boolean;
  index: number;
}

class SliderItem extends React.Component<SliderItemProps> {
  render() {
    const { episode, isActive } = this.props;

    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: isActive ? 0 : -1,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          px: { xs: 2, sm: 4, md: 10 }, // padding left-right
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.6)", // semi-transparent dark background
            zIndex: -1,
          }}
        />

        {/* Main Content */}
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "45%" },
            textAlign: { xs: "center", md: "left" },
            color: "#fff",
          }}
        >
          <Fade in={isActive} timeout={800}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
                background: "linear-gradient(120deg, #FFFFFF 0%, #FFD700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {episode.title}
            </Typography>
          </Fade>

          <Fade in={isActive} timeout={1000}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                mb: 4,
                lineHeight: 1.5,
                maxWidth: "100%",
              }}
            >
              {episode.desc}
            </Typography>
          </Fade>

          <Fade in={isActive} timeout={1200}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "red",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 12px rgba(255,215,0,0.3)",
                  },
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                Watch Now
              </Button>

              <Button
                variant="outlined"
                startIcon={<InfoOutlinedIcon />}
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "#FFD700",
                    transform: "translateY(-2px)",
                  },
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                }}
              >
                More Info
              </Button>
            </Box>
          </Fade>

          <Fade in={isActive} timeout={1400}>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Subscribe for ₹99/month
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Watch with Prime membership
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>
    );
  }
}

export default SliderItem;
