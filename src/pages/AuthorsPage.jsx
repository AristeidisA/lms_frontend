import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { fetchAuthors, addAuthor, deleteAuthor } from "../api/api";

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Φόρτωση συγγραφέων κατά την είσοδο στη σελίδα
  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Δεν υπάρχει διαθέσιμο token.");
        }
        console.log("Token που αποστέλλεται:", token);
        const data = await fetchAuthors(token);
        console.log("Αποτελέσματα από backend:", data);
        setAuthors(data);
      } catch (error) {
        console.error("Σφάλμα φόρτωσης συγγραφέων:", error);
        setError("Αποτυχία φόρτωσης συγγραφέων.");
      }
    };
    loadAuthors();
  }, []);

  // Προσθήκη νέου συγγραφέα
  const handleAddAuthor = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Δεν υπάρχει διαθέσιμο token.");
      }

      const newAuthorData = {
        name,
        date_of_birth: dateOfBirth,
      };

      // Κλήση API
      const response = await addAuthor(newAuthorData, token);

      setAuthors((prev) => [...prev, response.author]);

      setSuccess("Ο συγγραφέας προστέθηκε επιτυχώς!");
      // Καθαρισμός των input
      setName("");
      setDateOfBirth("");
    } catch (error) {
      console.error("Σφάλμα προσθήκης συγγραφέα:", error);
      setError("Αποτυχία προσθήκης συγγραφέα.");
    }
  };

  // Διαγραφή συγγραφέα
  const handleDeleteAuthor = async (authorId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Δεν υπάρχει διαθέσιμο token.");
      }

      await deleteAuthor(authorId, token);

      // Αφαιρούμε τον συγγραφέα από το state
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== authorId)
      );
      setSuccess("Ο συγγραφέας διαγράφηκε επιτυχώς!");
    } catch (error) {
      console.error("Σφάλμα διαγραφής συγγραφέα:", error);
      setError("Αποτυχία διαγραφής συγγραφέα.");
    }
  };

  return (
    <Container>
      <Typography variant="h4">🖋 Διαχείριση Συγγραφέων</Typography>

      {/* Εμφάνιση μηνυμάτων επιτυχίας/σφάλματος */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* Φόρμα προσθήκης συγγραφέα */}
      <form onSubmit={handleAddAuthor} style={{ marginBottom: "20px" }}>
        <TextField
          label="Όνομα Συγγραφέα"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Ημερομηνία Γέννησης"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Προσθήκη Συγγραφέα
        </Button>
      </form>

      <Typography variant="h5" sx={{ marginTop: 3 }}>
        📖 Λίστα Συγγραφέων
      </Typography>

      {/* Grid Layout για τους συγγραφείς */}
      <Grid container spacing={3}>
        {authors.length > 0
          ? authors.map((author) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}>
                <Card
                  sx={{
                    maxWidth: 250,
                    boxShadow: 3,
                    borderRadius: 2,
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{author.name}</Typography>
                    <Typography variant="body2">
                      Ημ. Γέννησης: {author.date_of_birth}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteAuthor(author.id)}
                      sx={{ marginTop: 1 }}
                    >
                      Διαγραφή
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : ""}
      </Grid>
    </Container>
  );
}

export default AuthorsPage;
