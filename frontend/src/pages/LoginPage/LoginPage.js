import React from "react";

import {LoginComponent} from "../../components/LoginComponent/LoginComponent";
import styles from "./LoginPage.module.css";


export const LoginPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.login_box}>
                <LoginComponent/>
            </div>
        </div>
    );
};
