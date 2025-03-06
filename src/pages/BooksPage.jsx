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
import { fetchBooks, addBook } from "../api/api";
import { deleteBook } from "../api/api";
import { fetchAuthors } from "../api/api";
function BooksPage() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [authors, setAuthors] = useState([]);

  // Φόρτωση βιβλίων κατά την είσοδο στη σελίδα
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔍 Token πριν το request:", token);
        if (!token) {
          throw new Error("Δεν υπάρχει διαθέσιμο token.");
        }
        console.log("Token που αποστέλλεται:", token);
        const data = await fetchBooks(token);
        console.log("Αποτελέσματα από backend:", data);
        setBooks(data);
      } catch (error) {
        console.error("Σφάλμα φόρτωσης βιβλίων:", error);
        setError("Αποτυχία φόρτωσης βιβλίων.");
      }
    };
    loadBooks();
  }, []);
  //useeffect για authors
  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Δεν υπάρχει διαθέσιμο token.");
        }
        const data = await fetchAuthors(token);
        setAuthors(data);
      } catch (error) {
        console.error("Σφάλμα φόρτωσης συγγραφέων:", error);
      }
    };
    loadAuthors();
  }, []);

  //Προσθηκη νεου βιβλιου
  const handleAddBook = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !authorId || !publicationYear.trim()) {
      setError("Συμπληρώστε όλα τα πεδία.");
      return;
    }

    if (isNaN(publicationYear) || publicationYear <= 0) {
      setError("Το έτος πρέπει να είναι αριθμός μεγαλύτερος από 0.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Δεν υπάρχει διαθέσιμο token.");
      }

      const newBook = {
        title,
        author_id: authorId,
        publication_year: publicationYear,
      };

      const response = await addBook(newBook, token);
      console.log("📌 Απάντηση από backend:", response);

      if (!response.book || !response.book.id) {
        throw new Error("Η απάντηση από το API δεν είναι έγκυρη.");
      }

      setBooks((prevBooks) => [...prevBooks, response.book]);
      setSuccess("Το βιβλίο προστέθηκε επιτυχώς!");
      setTitle("");
      setAuthorId("");
      setPublicationYear("");
    } catch (err) {
      console.error("Σφάλμα προσθήκης βιβλίου:", err.message);
      setError("Αποτυχία προσθήκης βιβλίου.");
    }
  };
  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await deleteBook(bookId, token); // Καλούμε το API για διαγραφή

      // ✅ Αφαίρεση του βιβλίου από το state ΧΩΡΙΣ ανανέωση σελίδας
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));

      setSuccess("Το βιβλίο διαγράφηκε επιτυχώς!");
    } catch (error) {
      console.error("Σφάλμα διαγραφής βιβλίου:", error);
      setError("Αποτυχία διαγραφής βιβλίου.");
    }
  };

  // const handleDeleteBook = async (bookId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await deleteBook(bookId, token); // Καλούμε το API για διαγραφή

  //     // ✅ Άμεση αφαίρεση από το state
  //     setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));

  //     setSuccess("Το βιβλίο διαγράφηκε επιτυχώς!");
  //   } catch (error) {
  //     console.error("Σφάλμα διαγραφής βιβλίου:", error);
  //     setError("Αποτυχία διαγραφής βιβλίου.");
  //   }
  // };

  return (
    <Container>
      <Typography variant="h4">📚 Διαχείριση Βιβλίων</Typography>

      {/* Εμφάνιση μηνυμάτων επιτυχίας/σφάλματος */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* Φόρμα προσθήκης βιβλίου */}
      <form onSubmit={handleAddBook} style={{ marginBottom: "20px" }}>
        <TextField
          label="Τίτλος Βιβλίου"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          select
          label="Συγγραφέας"
          fullWidth
          margin="normal"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </TextField>

        <TextField
          label="Έτος Έκδοσης"
          fullWidth
          margin="normal"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Προσθήκη Βιβλίου
        </Button>
      </form>

      <Typography variant="h5" sx={{ marginTop: 3 }}>
        📖 Λίστα Βιβλίων
      </Typography>

      {/* Grid Layout για τα βιβλία */}
      <Grid container spacing={3}>
        {books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card
                sx={{
                  maxWidth: 250,
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2">
                    Συγγραφέας ID: {book.author_name}
                  </Typography>
                  <Typography variant="body2">
                    Έτος Έκδοσης: {book.publication_year}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteBook(Number(book.id))}
                    sx={{ marginTop: 1 }}
                  >
                    Διαγραφή
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1"></Typography>
        )}
      </Grid>
    </Container>
  );
}

export default BooksPage;
