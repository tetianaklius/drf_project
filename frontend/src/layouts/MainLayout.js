import React from "react";
import {Outlet} from "react-router-dom";
import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";

export const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
            {/*<FooterComponent/>*/}
        </div>
    );
};
