import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
  Container,
} from "@mui/material";
import { loginUser } from "../../../Services/Api.js";
const Loginform: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email === "" || password === "") {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(email, password);
      toast.success("Login successful!");
      console.log(response);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
        setError(err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0C0F14",
        py: 4,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        style={{ top: "20px" }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#0C0F14",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              backgroundColor: "#1F222A",
              color: "white",
              borderRadius: 2,
              border: "2px solid #374151",
              width: { xs: "90%", sm: 400, md: 500 },
              maxWidth: 500,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ mb: 3, fontWeight: "bold", color: "white" }}
              aria-label="Login form heading"
            >
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, backgroundColor: "#1F222A " }}
            >
              <Box sx={{ mb: 2 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  placeholder="Enter Your Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error && email === ""}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#374151",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& input": {
                        backgroundColor: "#374151",
                        color: "white",
                      },
                      "& fieldset": { borderColor: "#FF0000" },
                      "&:hover fieldset": { borderColor: "#FF0000" },
                      "&.Mui-focused fieldset": { borderColor: "#FF0000" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    height: "18px",
                    color: "#f87171",
                    mt: 0.5,
                  }}
                >
                  {email === "" && error ? "Email is required" : " "}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  placeholder="Enter Your Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!error && password === ""}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#374151",
                    borderRadius: 2,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#FF0000" },
                      "&:hover fieldset": { borderColor: "#FF0000" },
                      "&.Mui-focused fieldset": { borderColor: "#FF0000" },
                    },
                  }}
                  InputProps={{
                    style: { color: "#5B5FE9" },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    height: "18px",
                    color: "#f87171",
                    mt: 0.5,
                  }}
                >
                  {password === "" && error ? "Password is required" : " "}
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1,
                  backgroundColor: "#FF0000",
                  "&:hover": { backgroundColor: "#FF0000" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
                  color: "white",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "white", cursor: "pointer" }}
                align="center"
                onClick={() => navigate("/signup")}
              >
                Create a account{" "}
                <span style={{ color: "white" ,font:"bold",textDecoration:"underline"}}> SignUp</span>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Loginform;
