import React from "react";
import styles from "./footer.module.css";
import iconFacebook from "../../assets/images/icon_facebook.png";
import iconInstagram from "../../assets/images/icon_instagram.png";
import iconTwitter from "../../assets/images/icon_twitter.png";
import iconMail from "../../assets/images/icon_mail.png";
import iconTwitch from "../../assets/images/icon_twitch.png";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container-md d-flex justify-content-between footer-container">
        <div className={styles.address}>
          <p>Jalan Suroyo No. 161 Mayangan Kota Probolinggo 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081-233-334-808</p>
        </div>
        <div className={styles.navigation}>
          <ul className="list-unstyled">
            <li>
              <a
                href="#our-services"
                className="text-decoration-none text-reset"
              >
                Our Services
              </a>
            </li>
            <li>
              <a href="#why-us" className="text-decoration-none text-reset">
                Why Us
              </a>
            </li>
            <li>
              <a
                href="#testimonial"
                className="text-decoration-none text-reset"
              >
                Testimonial
              </a>
            </li>
            <li>
              <a href="#faq" className="text-decoration-none text-reset">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <p>Conect with us</p>
          <span>
            <img src={iconFacebook} alt="" />
          </span>
          <span>
            <img src={iconInstagram} alt="" />
          </span>
          <span>
            <img src={iconTwitter} alt="" />
          </span>
          <span>
            <img src={iconMail} alt="" />
          </span>
          <span>
            <img src={iconTwitch} alt="" />
          </span>
        </div>
        <div className={styles.copyright}>
          <p>Copyright Binar 2022</p>
          <div className={styles.logoFooter}></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
