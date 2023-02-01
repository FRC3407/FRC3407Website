import Link from "next/link";
import styles from "styles/buttons/ButtonLink.component.module.scss"

export default function ButtonLink({ href, children }: { href: string, children?: string | React.ReactElement }) {
  return (
    <Link href={href} className={styles.ButtonLink}>{children ?? href}</Link>
  )
}