import type { NextComponentType } from "next";
import style from "../../styles/Navbar.module.scss";
import NavLink from "./link";

const Navbar: NextComponentType = () => {
  return (
    <div className={style.nav}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/page2">Page 2</NavLink>
      <NavLink href="/frc-resources">FRC Resources</NavLink>
      <NavLink href="/student-resources">Student Resources</NavLink>
    </div>
  );
};

export default Navbar;
