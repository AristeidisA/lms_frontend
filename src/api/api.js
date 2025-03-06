import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

///////////////////////USERS START////////////////////////////////
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Το όνομα χρήστη ή ο κωδικός είναι λάθος!");
  }

  return data; // Επιστρέφει το αντικείμενο με token & user info
};

///////////////////////USERS END////////////////////////////////

///////////////////////BOOKS START////////////////////////////////
export const addBook = async (bookData, token) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error("Σφάλμα API:", errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json();
};

export const fetchBooks = async (token) => {
  console.log("Token που αποστέλλεται ειναι αυτο:", token);
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Αποτυχία φόρτωσης βιβλίων.");
  }

  return await response.json();
};

export const deleteBook = async (bookId, token) => {
  console.log("📌 Book ID που θα διαγραφεί:", bookId, "Τύπος:", typeof bookId);
  const numericId = Number(bookId);
  const response = await fetch(`${API_BASE_URL}/books/${numericId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("📌 Απάντηση από backend:", response);

  if (!response.ok) {
    throw new Error("Αποτυχία διαγραφής βιβλίου.");
  }

  return await response.json();
};
///////////////////////USERS END////////////////////////////////

///////////////////////AUTHORS START////////////////////////////////
// GET - Φέρνει όλους τους συγγραφείς
export const fetchAuthors = async (token) => {
  const response = await fetch(`${API_BASE_URL}/authors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Αποτυχία φόρτωσης συγγραφέων.");
  }

  return await response.json();
};

// POST - Προσθέτει έναν νέο συγγραφέα
export const addAuthor = async (authorData, token) => {
  const response = await fetch(`${API_BASE_URL}/authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(authorData),
  });

  if (!response.ok) {
    throw new Error("Αποτυχία προσθήκης συγγραφέα.");
  }

  return await response.json();
};

// DELETE - Διαγράφει έναν συγγραφέα
export const deleteAuthor = async (authorId, token) => {
  const response = await fetch(`${API_BASE_URL}/authors/${authorId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Αποτυχία διαγραφής συγγραφέα.");
  }

  return await response.json();
};

export const deleteUser = async (userId, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Αποτυχία διαγραφής χρήστη.");
  }

  return await response.json();
};
