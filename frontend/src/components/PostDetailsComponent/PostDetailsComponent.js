import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {postService} from "../../services/postService";
import {PostFormComponent} from "../PostFormComponent/PostFormComponent";
import styles from "./PostDetailsComponent.module.css"


export const PostDetailsComponent = () => {
    const {id} = useParams();
    const [post, setPost] = useState({})

    const [formVisible, setFormVisible] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
    }, [formVisible]);

    useEffect(() => {
        postService.getById(id).then((data) => {
            setPost(data);
        })
    }, []);

    const data_props = {
        "form_visible": setFormVisible, "set_error": setError, "post": post, "set_post": setPost
    }

    return (
        <div className={styles.post_box}>
            <div className={styles.post_form}>
                {formVisible ? (<PostFormComponent data={data_props}/>) : <div></div>}
                <div className={styles.error_msg}>
                    {error}
                </div>
            </div>
            <hr/>
            <div className={styles.post}>
                <div className={styles.post_upper}>
                    <div className={styles.post_title}>
                        <h3>{post.title}</h3>
                    </div>
                    <div className={styles.post_label}>
                        {post.label?.name}
                    </div>
                </div>
                <div className={styles.post_author}>
                    post id: {post.id}
                    by user: {post.user_id}
                </div>
                <div className={styles.post_text}>
                    {post.text}
                </div>
            </div>
            <div>
                <button className={styles.update_button} disabled={formVisible} onClick={() => {
                    setFormVisible(true)
                }}>Update post
                </button>
            </div>
        </div>
    );
};
