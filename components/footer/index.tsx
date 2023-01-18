import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextComponentType } from "next";
import styles from "../../styles/Footer.module.scss";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer: NextComponentType = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.leftFooter}>
        <a
          className={styles.mediaIcon}
          href={"https://github.com/FRC3407"}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
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
