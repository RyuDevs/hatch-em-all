import React from "react";
import NavigationComponent from "../../components/navigation/navigationComponent";
import "./navigation.css";

const Navigation = () => {
    return (
        <nav>
            <ul>
                {NavigationComponent.navLinks.map(link => {
                return <li key={link}>{link}</li>
                })}
            </ul>
        </nav>
    )
}

export default Navigation;