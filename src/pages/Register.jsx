import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loading state για καλύτερη UX
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true); // ✅ Ενεργοποίηση loading πριν την API κλήση

    try {
      const response = await registerUser(formData);
      console.log("API Response:", response); // Debugging

      setSuccess(response.message || "Ο χρήστης δημιουργήθηκε επιτυχώς!");

      setTimeout(() => {
        navigate("/login"); // ✅ Redirect με timeout για καλύτερη εμπειρία
      }, 2000);

      return; // ✅ Σταμάτησε την εκτέλεση εδώ για να μην συνεχίσει
    } catch (err) {
      console.error("API Error:", err); // Debugging
      setError(err.response?.data?.message || "Σφάλμα κατά την εγγραφή.");
    } finally {
      setLoading(false); // ✅ Απενεργοποίηση loading μετά την ολοκλήρωση
    }
  };

  return (
    <Container maxWidth="xs">
      <h2>🧾Εγγραφή </h2>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Όνομα"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Κωδικός"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // ✅ Disable button όταν γίνεται η αίτηση
        >
          {loading ? <CircularProgress size={24} /> : "Εγγραφή Χρήστη"}
        </Button>
      </form>
    </Container>
  );
}

export default Register;
