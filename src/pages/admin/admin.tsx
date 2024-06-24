import React,{useContext} from "react";
// import CardAdmin from "../../components/cards/cardAdmin";
import Sidebar from "../../components/sidebar/sidebar";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import styles from "./admin.module.css";
import TableCars from "../../components/cards/tableCars";
import { AdminContext } from "../../context/admin";

const Admin: React.FC = () => {
  const {handleLogout} = useContext(AdminContext);


  return (
    <div className="d-flex flex-row" style={{ backgroundColor: "#F4F5F7" }}>
      <Sidebar />
      <div>
        <div
          className="d-flex flex-row justify-content-between align-items-center"
          style={{
            height: "70px",
            width: "1230px",
            backgroundColor: "#FFFFFF",
            boxShadow: "2px 10px 18px #EBEFF5",
          }}
        >
          <NavbarAdmin />
          <button onClick={handleLogout()} id={styles.btnBlue}>
            Logout
          </button>
        </div>
        {/* <CardAdmin /> */}
        <TableCars />
      </div>
    </div>
  );
};

export default Admin;
