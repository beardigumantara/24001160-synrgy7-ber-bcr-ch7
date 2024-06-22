import React from "react";
import CardAdmin from "../../components/cards/cardAdmin";

const Admin: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <CardAdmin />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Admin;