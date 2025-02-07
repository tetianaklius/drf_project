import React from "react";
import {Link} from "react-router-dom";
import styles from "./HeaderComponent.module.css"

export const HeaderComponent = () => {
    return (
        <div>
            <header className={styles.menu_wrap}>
                <Link to="/registration"> Registration </Link>
                <Link to="/login"> Login </Link>
                <Link to="/posts"> Posts </Link>
                <Link to="/users"> Users </Link>
                <Link to="/logout"> LogOut </Link>
            </header>
        </div>
    );
};
