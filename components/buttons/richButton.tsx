import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "styles/RichButton.component.module.scss";
import {
  faFileCode,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";

export default function RichButton({
  title,
  description,
  href,
  displayUrl,
  imgUrl,
  fallbackImgIcon = faFileCode,
  fallbackColor = "rgb(0, 149, 255)",
}: {
  title: string;
  description: string;
  href: string;
  displayUrl: string;
  imgUrl?: string;
  fallbackImgIcon?: IconDefinition;
  fallbackColor?: string;
}) {
  const defaultIcon = () => {
    if (!imgUrl?.length || 0 > 0)
      return (
        <FontAwesomeIcon
          icon={fallbackImgIcon}
          size="5x"
          className={styles.icon}
        />
      );
  };

  const onClick = () => (window.location.href = href);

  let imgStyles = {
    backgroundImage: `url("${imgUrl}")`,
    backgroundColor: imgUrl && imgUrl.length > 0 ? "" : fallbackColor,
  };

  return (
    <div className={styles.RichButton} onClick={onClick}>
      <div className={styles.RichButtonImage} style={imgStyles}>
        {defaultIcon()}
      </div>
      <div className={styles.RichButtonText}>
        <div className={styles.RichButtonTextTitleLink}>
          <h3>{title}</h3>
          <a>
            <h4>{displayUrl}</h4>
          </a>
        </div>
        <div className={styles.RichButtonTextDescription}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
