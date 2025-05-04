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
import { signupUser } from "../../../Services/Api.ts";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const user = { name, email, password };
      const data = await signupUser(user);
      toast.success("Signup successful!");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response.data.errors[0]);
      setError(
        err.response.data.errors || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }

    console.log("Signup Info:", { name, email, password });
  };
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              backgroundColor:"black",
              color: "white",
              border:"2px solid #374151",
              borderRadius: 2,
              width: { xs: "90%", sm: 400, md: 500 },
              maxWidth: 500,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ mb: 3, fontWeight: "bold", color: "white" }}
            >
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!error && name === ""}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#374151",
                    borderRadius: 1,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
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
                  sx={{ height: "18px", color: "#f87171", mt: 0.5 }}
                >
                  {name === "" && error ? "Name is required" : " "}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Your Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error && email === ""}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#374151",
                    borderRadius: 1,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
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
                  sx={{ height: "18px", color: "#f87171", mt: 0.5 }}
                >
                  {email === "" && error ? "Email is required" : " "}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!error && password === ""}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#374151",
                    borderRadius: 1,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
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
                  sx={{ height: "18px", color: "#f87171", mt: 0.5 }}
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
                  mt: {xs: 1, sm: 1},
                  mb: 3,
                  py: 1,
                  backgroundColor: "#FF0000",
                  "&:hover": { backgroundColor: "#FF0000" },
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
                  color: "white",
                }}
              >
                {loading ? "Signing In" : "Sign Up"}
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
                sx={{ color: "white", cursor: "pointer" ,textDecoration:"none"}}
                align="center"
                onClick={() => navigate("/login")}
              >
                Create a account <span style={{ color: "white",textDecoration:"underline" }}>Login</span>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupForm;
