import React from "react";
import {Link, useNavigate} from "react-router-dom";

import styles from "./HeaderComponent.module.css"
import {authService} from "../../services/authService";


export const HeaderComponent = () => {

    const navigate = useNavigate()

    const logOut = () => {
        authService.logout();
        navigate("/login")
    }

    return (
        <div>
            <header className={styles.menu_wrap}>
                <Link to="/register"> RegisterPage </Link>
                <Link to="/login"> LoginPage </Link>
                <Link to="/posts"> Posts </Link>
                <Link to="/users"> UsersPage </Link>
                <button onClick={logOut}> LogOut</button>
            </header>
            <br/>
        </div>
    );
};
