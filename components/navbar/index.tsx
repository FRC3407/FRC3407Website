import type { NextComponentType } from "next";
import style from "../../styles/components/Navbar.module.scss";
import NavLink from "./link";
import Image from "next/image";

function profileClick() {
  console.log("omg you clicked the john!"); // this better make it into production
  let profileMenu=document.getElementById("profileMenu");
  if (profileMenu) {
    profileMenu.hidden=!profileMenu.hidden; // toggle the menu visibility
  } else {
    console.error("oh no");
  }
}

const Navbar: NextComponentType = () => {
  return (
    <div>
      <div className={style.nav}>
        <div className={style.profilePictureContainer}>
          <div id="profileMenu" className={style.profileMenu} hidden>
            <h1>Menu</h1>
            <a href="#">calvin</a>
            <a href="#">is</a>
            <a href="#">epic</a>
          </div>
          <Image tabIndex={0} onClick={profileClick} src="/static/images/assets/johnl.jpg" alt="Profile picture" fill className={style.profilePicture} />
        </div>
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
