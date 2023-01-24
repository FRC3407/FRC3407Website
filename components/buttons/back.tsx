import styles from "styles/Back.component.module.scss";

export default function Back({ url }: { url: string | (() => void) }) {
  if (typeof url === "function") {
    return <button onClick={url}>Back</button>;
  }

  return <a href={url}>Back</a>;
}
