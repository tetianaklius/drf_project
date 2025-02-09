import React from "react";

import {RegisterComponent} from "../../components/RegisterComponent/RegisterComponent";
import styles from "./RegisterPage.module.css";


export const RegisterPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.register_box}>
                <RegisterComponent/>
            </div>
        </div>
    );
};
