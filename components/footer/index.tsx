import type { NextComponentType } from "next";
import styles from "../../styles/Footer.module.scss"

const Footer: NextComponentType = () => {
    return (
        <div className={styles.footer}>
            <p>This is a footer :O (wow)</p>
        </div>
    )
}

export default Footer