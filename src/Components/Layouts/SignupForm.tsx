import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
  Container,
} from "@mui/material";

const SignupForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Signup Info:", { name, email, password });
    // proceed to submit or navigate
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1f2937",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              backgroundColor: "#1f2937",
              color: "white",
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

            {error && (
              <Alert severity="error" sx={{ mb: 2, color: "#f87171", bgcolor: "#374151" }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
              {/* Name */}
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
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "#9ca3af" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
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

              {/* Email */}
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
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "#9ca3af" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
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

              {/* Password */}
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
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "#9ca3af" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
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

              {/* Confirm Password */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!error && confirmPassword === ""}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#374151",
                    borderRadius: 1,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "#9ca3af" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
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
                  {confirmPassword === "" && error
                    ? "Please confirm password"
                    : " "}
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1,
                  backgroundColor: "#4b5563",
                  "&:hover": { backgroundColor: "#6b7280" },
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
                  color: "white",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupForm;
