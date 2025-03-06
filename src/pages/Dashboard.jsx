import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../api/api";
import writers from "../assets/writers.jpg";
import books from "../assets/books.jpg";

const Dashboard = () => {
  const [username, setUsername] = useState(""); // State για το username
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Αν υπάρχει username, το βάζουμε στο state
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Διαγραφή του username
    navigate("/login");
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("Token:", token);
      console.log("User ID:", userId);
      if (!token || !userId) {
        throw new Error("Δεν υπάρχει διαθέσιμο token ή user ID.");
      }

      await deleteUser(userId, token);

      // Καθαρισμός τοπικών δεδομένων
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      alert("Ο λογαριασμός σας διαγράφηκε επιτυχώς!");
      window.location.href = "/login"; // Redirect στο login
    } catch (error) {
      console.error("Σφάλμα διαγραφής χρήστη:", error);
      alert("Αποτυχία διαγραφής λογαριασμού.");
    }
  };

  return (
    <Container sx={{ height: "100vh", textAlign: "center" }}>
      <Typography variant="h4">Καλώς ήρθες, {username}!</Typography>
      <Button onClick={handleLogout} variant="contained" color="secondary">
        Αποσύνδεση
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ ml: 2 }}
        onClick={handleDeleteUser}
      >
        Διαγραφή Λογαριασμού
      </Button>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          gap: 4,
        }}
      >
        {/* ΒΙΒΛΙΑ */}
        <Box
          sx={{
            textAlign: "center",
            height: "30vh",
            p: "50px",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            },
          }}
          onClick={() => navigate("/books")}
        >
          <Typography variant="h4" sx={{ mb: 2, width: "10vw" }}>
            ΒΙΒΛΙΑ
          </Typography>
          <Box
            component="img"
            src={books} // Βάλε εδώ το path της εικόνας
            alt="Βιβλία"
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        {/* ΣΥΓΓΡΑΦΕΙΣ */}
        <Box
          sx={{
            textAlign: "center",
            height: "30vh",
            p: "50px",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)", // Κάνει scale-up
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            },
          }}
          onClick={() => navigate("/authors")} // Redirect στη σελίδα Συγγραφείς
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            ΣΥΓΓΡΑΦΕΙΣ
          </Typography>
          <Box
            component="img"
            src={writers} // Βάλε εδώ το path της εικόνας
            alt="Συγγραφείς"
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      </Container>
    </Container>
  );
};

export default Dashboard;
