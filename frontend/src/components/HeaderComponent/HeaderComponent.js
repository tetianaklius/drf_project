import React from "react";
import {Link, useNavigate} from "react-router-dom";

import {authService} from "../../services/authService";
import styles from "./HeaderComponent.module.css"


export const HeaderComponent = () => {

    const navigate = useNavigate()

    const logOut = () => {
        authService.logout();
        navigate("/login")
    }

    return (
        <div className={styles.main}>
            <header className={styles.navbar}>
                <Link to="/register"> Registration </Link>
                <Link to="/login"> Login </Link>
                <Link to="/posts"> Posts </Link>
                <Link to="/users"> Users </Link>
                <Link to="/profile"> Profile </Link>
                <button onClick={logOut}> LogOut</button>
            </header>
        </div>
    );
};
