import React from "react";

import {PostsComponent} from "../../components/PostsComponent/PostsComponent";

import styles from "./PostsPage.module.css";


export const PostsPage = () => {
    return (
        <div className={styles.main}>
            <PostsComponent/>
        </div>
    );
};
