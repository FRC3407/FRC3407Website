import type { NextComponentType } from "next";
import styles from "../../styles/components/Footer.module.scss";
import GithubIcon from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";



const LinkColumn = (columnName: string, links: [string, string][]) => {
  return (
    <div className={styles.linkColumn}>
      <h3 className={styles.linkColumnHeader}>{columnName}</h3>
      {links.map(([displayUrl, url]) => <a key={displayUrl} href={url} className={styles.linkColumnLink}>{displayUrl}</a>)}
    </div>
  )
}

const links: [string, [string, string][]][] = [["Hello", [["hello", "https://hello.com"]]]]

const Footer: NextComponentType = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.upperFooter}>
        <div className={styles.socialMediaContainer}>
          <a><Avatar className={styles.githubIcon}><GithubIcon fontSize="inherit" /></Avatar></a>
        </div>
        <h4>Official Website of FRC Team 3407</h4>
      </div>
      <div className={styles.lowerFooter}>
        {links.map(([title, links]) => LinkColumn(title, links))}
      </div>
    </footer>
  );
};

export default Footer;
