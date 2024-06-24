import React from "react";
import styles from "./sidebar.module.css";
import dashboard from "../../assets/images/Home.png";
import carIcon from "../../assets/images/Administrator.png";

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex flex-row">
      <div className={styles.navbar}>
        <a href="" className={styles.logo}>
          <span>BCR</span>
        </a>
        <a href="/admin"><img src={dashboard} alt="" /></a>
        <a href="/admin/cars"><img src={carIcon} alt="" /></a>
      </div>
      <div className={styles.sidebar}>  
        <a href="" className={styles.logo1}>
          <span>BCR</span>
        </a>
        <h2>DASHBOARD</h2>
        <a href=""><p>Dashboard</p></a>
      </div>
    </div>
  );
};

export default Sidebar;
