import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { categories } from "../constants";

const Navbar = () => {

    const linkStyle = {
        textDecoration: "none",
        color: "white"
    }
    return (
        <>
            <div className="navbar">
                <nav>
                    <ul>
                        <h2><Link style={linkStyle} to="/">News App</Link></h2>
                        {
                            categories.map((category) => <li key={category}><Link style={linkStyle} to={"/" + category}>{category}</Link></li>)
                        }
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navbar;