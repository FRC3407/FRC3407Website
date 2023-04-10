import type { NextComponentType } from "next";
import style from "../../styles/components/Navbar.module.scss";
import NavLink from "./link";
import { useRouter } from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import { signIn, useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";

interface INavLink {
  text: string
  href?: string
  onClick?: () => any
}

const notSignedInNavLinks: INavLink[] = [
  {
    text: "Sign In",
    onClick() {
      signIn()
    }
  }
]
const signedInNavLinks: INavLink[] = [
  {
    text: "Customize",
    href: "/members/customize"
  }
]

function profileClick() {
  console.log("omg you clicked the john!"); // this better make it into production
  let profileMenu = document.getElementById("profileMenu");
  if (profileMenu) {
    profileMenu.hidden = !profileMenu.hidden; // toggle the menu visibility
  } else {
    console.error("oh no");
  }
}

function mobileMenuClick() {
  let mobileNav=document.getElementById("mobileNav") as HTMLDivElement;
  if (mobileNav === null) {
    console.error("where the mobile nav go?");
    return;
  }
  // mobileNav.style.height= open ? "0%" : "fit-content";
  let open=mobileNav.style.display==="block";
  mobileNav.setAttribute('style', `display:${open?"none":"block"} !important`);
}

const Navbar: NextComponentType = () => {
  let router = useRouter();
  let session = useSession()

  const [image, setImage] = useState("")
  const [navLinks, setNavLinks] = useState(notSignedInNavLinks)

  useEffect(() => {
    if (session.status === "loading") return
    if (session.status === "unauthenticated") {
      setImage("")
      return
    }

    setImage(session?.data?.user?.image ?? ((session.data?.user.accessLevel > 1) ? "/static/images/assets/johnl.jpg" : ""))
    setNavLinks(signedInNavLinks)
  }, [session])

  return (
    <div>
      <div className={style.nav}>
        <div className={style.profilePictureContainer}>
          <div id="profileMenu" className={style.profileMenu} hidden>
            <h1>Menu</h1>
            {navLinks.map(navLink => <a key={navLink.text} href={navLink.href} onClick={navLink.onClick}>{navLink.text}</a>)}
          </div>
          <Avatar
            onClick={profileClick}
            src={image}
            alt="Profile picture"
            className={style.profilePicture}
          />
        </div>
        <h1>FRC Team 3407</h1>

        <nav className={style.desktop}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/calendar">Calendar</NavLink>
          <NavLink href="/frc-resources">FRC Resources</NavLink>
          <NavLink href="/student-resources">Student Resources</NavLink>
        </nav>

        <button className={style.mobileMenu} onClick={mobileMenuClick}>
          <MenuIcon fontSize="inherit" />
        </button>

        <nav style={{
          display: "none !important"
        }} className={style.mobile} id="mobileNav">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/calendar">Calendar</NavLink>
          <NavLink href="/frc-resources">FRC Resources</NavLink>
          <NavLink href="/student-resources">Student Resources</NavLink>
        </nav>
      </div>
      <div className={style.navBufferDiv} />
    </div>
  );
};

export default Navbar;
