import Navbar from "./navbar"


export default function Layout({ children }) {
    console.log("layout");
    return (
        <>
            <Navbar />
            <main>{children}</main>
           
        </>
    )
}