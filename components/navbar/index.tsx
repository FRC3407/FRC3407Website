import type { NextComponentType } from "next";
import style from "../../styles/Navbar.module.scss"

const Navbar: NextComponentType = () => {
    return (
        <div className={style.nav}>
            <a className={style.button} href="https://itsnotcatchy.com">
                <h1>Home</h1>
            </a>
        </div>
    )
}

export default Navbar