import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LMS Library
          </Typography>

          {!isRegisterPage && isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                ΑΡΧΙΚΗ
              </Button>
              <Button color="inherit" component={Link} to="/books">
                Βιβλία
              </Button>
              <Button color="inherit" component={Link} to="/authors">
                Συγγραφείς
              </Button>
            </>
          )}

          {!isAuthenticated ? (
            <Button color="inherit" component={Link} to="/login">
              Σύνδεση
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Αποσύνδεση
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
}

export default Layout;
