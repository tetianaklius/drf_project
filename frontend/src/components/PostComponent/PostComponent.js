import React from "react";
import {useNavigate} from "react-router-dom";

import styles from "./PostComponent.module.css";


export const PostComponent = ({post}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.post_box}>
            <div className={styles.post_title}>
                {post.id}. {post.title}
            </div>
            <button className={styles.btn_details} onClick={() => {
                navigate(`post_details/${post.id}`)
            }}>Post details
            </button>
        </div>
    );
};
