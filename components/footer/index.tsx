import type { NextComponentType } from "next";
import styles from "../../styles/components/Footer.module.scss";
import GithubIcon from "@mui/icons-material/GitHub"
import Avatar from "@mui/material/Avatar"

const Footer: NextComponentType = () => {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/FRC3407/"><Avatar className={styles.icon}><GithubIcon fontSize="large" /></Avatar></a>
      <div className={styles.centerFooter}>
        <p>This site is still under development</p>
      </div>
      <div className={styles.rightFooter}>
        Official Website of the FRC 3407 Robotics Team
      </div>
    </div>
  );
};

export default Footer;
