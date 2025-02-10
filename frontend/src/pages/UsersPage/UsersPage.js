import React from "react";

import {UsersSearchComponent} from "../../components/UsersSearchComponent/UsersSearchComponent";
import styles from "./UsersPage.module.css";


export const UsersPage = () => {
    return (
        <div className={styles.main}>
            <UsersSearchComponent/>
        </div>
    );
};
