import type { NextComponentType } from "next";
import style from "../../styles/components/Navbar.module.scss";
import NavLink from "./link";

const Navbar: NextComponentType = () => {
  return (
    <div>
      <div className={style.nav}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/calendar">Calendar</NavLink>
        <NavLink href="/frc-resources">FRC Resources</NavLink>
        <NavLink href="/student-resources">Student Resources</NavLink>
      </div>
      <div className={style.navBufferDiv} />
    </div>
  );
};

export default Navbar;
