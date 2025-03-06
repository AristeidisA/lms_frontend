import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage(null);
  //   setLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:8080/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setMessage({
  //         type: "success",
  //         text: "Επιτυχής σύνδεση! Μεταφέρεστε...",
  //       });
  //       localStorage.setItem("token", data.token); // ✅ Αποθήκευση token
  //       localStorage.setItem("username", username); // ✅ Αποθήκευση ονόματος χρήστη
  //       localStorage.setItem("userId", data.user.id); // Αποθηκεύουμε το user ID

  //       setTimeout(() => {
  //         navigate("/dashboard"); // ✅ Redirect στο Dashboard
  //       }, 1500);
  //     } else {
  //       throw new Error(
  //         data.message || "Το όνομα χρήστη ή ο κωδικός είναι λάθος!"
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Login Error:", err);
  //     setMessage({ type: "error", text: err.message });
  //   } finally {
  //     setLoading(false);
  //   }
  //   console.log("Username:", username, "Password:", password);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const data = await loginUser(username, password); // ✅ Χρησιμοποιεί το api.js

      setMessage({
        type: "success",
        text: "Επιτυχής σύνδεση! Μεταφέρεστε...",
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", data.user.id); // Αποθήκευση του user ID

      setTimeout(() => {
        navigate("/dashboard"); // ✅ Redirect στο Dashboard
      }, 1500);
    } catch (err) {
      console.error("Login Error:", err);
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <h2>🔐 Σύνδεση</h2>
      {message && <Alert severity={message.type}>{message.text}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Όνομα Χρήστη"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Κωδικός"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Σύνδεση"}
        </Button>
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          component={Link}
          to="/register"
          fullWidth
        >
          ΕΓΓΡΑΦΗ
        </Button>
      </form>
    </Container>
  );
};

export default Login;
