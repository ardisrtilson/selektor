import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/browse">Browse</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/upload">Upload</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/friends">Friends</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/logout">Logout</Link>
            </li>
        </ul>
    )
}