import React, {useContext} from "react";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import CardAdmin from "../../components/cards/cardAdmin";
import styles from "./admin.module.css";
import Sidebar1 from "../../components/sidebar/sidebar1";
import { AdminContext } from "../../context/admin";

const CarAdmin: React.FC = () => {
  const {handleLogout} = useContext(AdminContext);

  return (
    <div className="d-flex flex-row" style={{ backgroundColor: "#F4F5F7", height:"100vh" }}>
      <Sidebar1 />
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
          <button onClick={handleLogout} id={styles.btnBlue}>
            Logout
          </button>
        </div>
        <CardAdmin />
      </div>
    </div>
  );
};

export default CarAdmin;
