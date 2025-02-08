import React from "react";
import {Outlet} from "react-router-dom";

import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";
import styles from "./MainLayout.module.css";


export const MainLayout = () => {
    return (
        <div className={styles.main}>
            <HeaderComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>
    );
};
