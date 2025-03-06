import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import BooksPage from "./pages/BooksPage"; // ✅ Προσθήκη
import AuthorsPage from "./pages/AuthorsPage"; // ✅ Προσθήκη
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Όταν πάμε στο "/", να πηγαίνει στο "/register" */}
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<BooksPage />} /> {/* ✅ Προσθήκη */}
            <Route path="/authors" element={<AuthorsPage />} />{" "}
            {/* ✅ Προσθήκη */}
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
