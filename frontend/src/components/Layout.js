import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
    return (
        <main className="App">
            <Navbar></Navbar>
            <Outlet />
        </main>
    )
}

export default Layout
