import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Container,
} from "@mui/material";
import { signupUser } from "../../../Utils/Api.ts";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Error state management for each field
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // API error state
  const [apiError, setApiError] = useState<string>("");

  const isEmailValid = (email: string) => {
    const emailRegex = /^.+@.+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const isPasswordValid = (password: string) => {
      const minLengthRegex = /.{8,}/; // At least 8 characters
      const numberRegex = /[0-9]/; // At least one number
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    
      if (!minLengthRegex.test(password)) {
        return "Password must be at least 8 characters.";
      }
      if (!numberRegex.test(password)) {
        return "Password must contain at least one number.";
      }
      if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character.";
      }
      return ""; // Password is valid
    };

    // Reset error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setApiError("");  // Reset API error

    // Validation
    let valid = true;

    if (!name) {
      setNameError("Name is required.");
      valid = false;
    }
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }
    else{
      const passwordValidationError = isPasswordValid(password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        valid = false;
      }
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (!valid) {
      setLoading(false);
      return; // Stop if validation fails
    }

    try {
      const user = { name, email, password };
      const data = await signupUser(user);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err: any) {
      // toast.error(err.response?.data?.errors?.[0] || "Signup failed.");
      
      // Handle API error and display it
      setApiError(err.response?.data?.errors?.[0] || "Signup failed. Please try again.");
      setNameError(err.response?.data?.errors?.name || "");
      setEmailError(err.response?.data?.errors?.email || "");
      setPasswordError(err.response?.data?.errors?.password || "");
      setConfirmPasswordError(err.response?.data?.errors?.confirmPassword || "");
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
        backgroundColor: "black",
        py: 2,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              backgroundColor: "black",
              color: "white",
              border: "2px solid #374151",
              borderRadius: 2,
              width: { xs: "90%", sm: 400, md: 500 },
              maxWidth: 500,
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 1, fontWeight: "bold" }}>
              Sign Up
            </Typography>

            {/* API Error Message */}
            
            <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
              {/* Name */}
              <TextField
                fullWidth
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                variant="outlined"
                sx={{
                  mb: 0.1,
                  mt: 1,
                  backgroundColor: "#374151",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FF0000" },
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: "#f87171" }}>
                {nameError}
              </Typography>

              {/* Email */}
              <TextField
                fullWidth
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                variant="outlined"
                sx={{
                  mb: 0.1,
                  mt: 1,
                  backgroundColor: "#374151",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FF0000" },
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: "#f87171" }}>
                {emailError}
              </Typography>

              {/* Password */}
              <TextField
                fullWidth
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                variant="outlined"
                sx={{
                  mb: 0.1,
                  mt: 1,
                  backgroundColor: "#374151",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FF0000" },
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: "#f87171" }}>
                {passwordError}
              </Typography>

              {/* Confirm Password */}
              <TextField
                fullWidth
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                variant="outlined"
                sx={{
                  mb: 0.1,
                  mt: 1,
                  backgroundColor: "#374151",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FF0000" },
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: "#f87171" }}>
                {confirmPasswordError}
              </Typography>
              {apiError && (
              <Box sx={{  mt:0.7,mb: 0.7, backgroundColor: "black", padding: 1, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ color: "red", textAlign: "center" }}>
                  {apiError}
                </Typography>
              </Box>
            )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 1,
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
                {loading ? "Signing In..." : "Sign Up"}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "white", textAlign: "center", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Already have an account?{" "}
              <span style={{ textDecoration: "underline" }}>Login</span>
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupForm;
