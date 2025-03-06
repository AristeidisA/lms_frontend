import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Δημιουργία custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Μπλε (default primary color)
    },
    secondary: {
      main: "#dc004e", // Κόκκινο (default secondary color)
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
