import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {postService} from "../../services/postService";
import {PostFormComponent} from "../PostFormComponent/PostFormComponent";
import styles from "../PostsComponent/PostsComponent.module.css";

export const PostDetailsComponent = () => {
    const {id} = useParams();
    const [post, setPost] = useState({})

    const [formVisible, setFormVisible] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        postService.getById(id).then((data) => {
            setPost(data);
        })
    }, []);

    const data_props = {
        "form_visible": setFormVisible, "set_error": setError, "post": post
    }

    return (
        <div>
            <div className={styles.component_wrap}>
                {formVisible ? (<PostFormComponent data={data_props}/>) : <div></div>}
                <div>{error}</div>
                <hr/>
                <div>
                    <div>
                        {post.title}
                    </div>
                    <div>
                        {post.label}
                    </div>
                </div>
                <div>
                    post id: {post.id}
                    by user: {post.user_id}
                </div>
                <div>
                    {post.text}
                </div>

                <button onClick={() => {
                        setFormVisible(true)
                }}>post update {post.id}
                </button>
            </div>
        </div>
    );
};
