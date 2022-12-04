import Link from "next/link";
import style from "../../styles/Navbar.module.scss"
import { useRouter } from 'next/router'

/**
 * Get the classes of a link based on the current path
 * @param href The link destination
 * @param currentPath The current path (from NextRouter.pathname)
 */
function getNavLinkClass(currentPath:string,href:string): string {
    return `${style.button} ${currentPath===href ? style.currentPath : ""}`
}

export default function NavLink({ children,href }: { children: any,href:string }) {
    let router=useRouter();

    return (
        <Link className={getNavLinkClass(router.pathname,href)} href={href}>{children}</Link>
    )
}