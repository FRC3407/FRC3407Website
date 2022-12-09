import Footer from "../footer";
import Navbar from "../navbar";
import Head from 'next/head'

export default function Layout({ children, title }: { children: any, title: string }) {
    return (
        <div>
            <Head>
                <title>{title+" | FRC 3407"}</title>
            </Head>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}
