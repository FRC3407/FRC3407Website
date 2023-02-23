import type { NextComponentType } from "next";
import styles from "../../styles/components/Footer.module.scss";
import GithubIcon from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";

const LinkColumn = (
  columnName: string,
  links: [string, string][],
  key: string
) => {
  return (
    <div className={styles.linkColumn} key={key}>
      <h3 className={styles.linkColumnHeader}>{columnName}</h3>
      {links.map(([displayUrl, url]) => (
        <a
          key={displayUrl}
          href={url}
          className={styles.linkColumnLink}
          target={url.startsWith("http") ? "_blank" : "_self"}
          rel="noreferrer"
        >
          {displayUrl}
        </a>
      ))}
    </div>
  );
};

const links: [string, [string, string][]][] = [
  [
    "Media",
    [
      ["Github", "https://github.com/FRC3407"],
      ["Blue Alliance", "https://www.thebluealliance.com/team/3407"],
    ],
  ],
  [
    "About Us",
    [
      ["About Us", "/about"],
      ["Pictures", "/pictures"],
      ["Sponsors", "/sponsors"],
    ],
  ],
  ["Website", []],
];

const Footer: NextComponentType = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.upperFooter}>
        <div className={styles.socialMediaContainer}>
          <a href="https://github.com/FRC3407">
            <Avatar className={styles.githubIcon}>
              <GithubIcon fontSize="inherit" />
            </Avatar>
          </a>
        </div>
        <h4>Official Website of FRC Team 3407</h4>
      </div>
      <div className={styles.lowerFooter}>
        <h3>Important Links</h3>
        <div className={styles.links}>
          {links.map(([title, links]) => LinkColumn(title, links, title))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
