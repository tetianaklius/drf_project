import React from "react";

import {PostDetailsComponent} from "../../components/PostDetailsComponent/PostDetailsComponent";
import styles from "./PostDetailsPage.module.css";


export const PostDetailsPage = () => {
    return (
        <div className={styles.main}>
            <PostDetailsComponent/>
        </div>
    );
};
