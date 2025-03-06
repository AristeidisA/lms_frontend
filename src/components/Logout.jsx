import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Διαγράφει το token
    navigate("/login"); // Ανακατεύθυνση στο login
  };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">
      Logout
    </Button>
  );
};

export default Logout;
