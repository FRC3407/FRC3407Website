import Footer from "../footer";
import Navbar from "../navbar";
import Head from 'next/head'

export default function Layout({ children, title }: { children: any, title: string }) {
    return (
        <div>
            <Head>
                <title>{title+" | FRC 3407"}</title>
                <meta name="description" content="The website for FRC 3407" />
            </Head>
            <Navbar/>
            <div className="content">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
