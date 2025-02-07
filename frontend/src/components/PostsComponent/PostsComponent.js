import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import styles from "./PostsComponent.module.css";

import {refreshService} from "../../services/authService";
import {PostComponent} from "../PostComponent/PostComponent";
import {PostFormComponent} from "../PostFormComponent/PostFormComponent";
import {postService} from "../../services/postService";

export const PostsComponent = () => {
    const navigate = useNavigate();

    const [formVisible, setFormVisible] = useState(false)
    const [error, setError] = useState(false)
    const [token, setToken] = useState(true)
    const [posts, setPosts] = useState()


    useEffect(() => {

    }, [formVisible]);

    useEffect(() => {

            try {
                postService.getAll().then((response) => {
                    const data = response?.data
                    const status = response["status"]

                    if (!status) {
                        setPosts(data)
                    }
                    if (status === 401) {
                        refreshService.refresh().then(data => {
                            console.log(data);
                            setToken(prevState => !prevState)
                        })
                    }
                })
            } catch (err) {
                setError(JSON.stringify([{"err_message": err.message}]))
            }

        },
        [token]
    );

    const data_props = {
        "form_visible": setFormVisible, "set_error": setError
    }

    return (
        <div>
            <div className={styles.component_wrap}>

                {formVisible ? (<PostFormComponent data={data_props}/>) : <div></div>}
                <div>{error}</div>
                <hr/>
                <button className={styles.add_button}
                        onClick={() => {
                            setFormVisible(true)
                        }}>Додати оголошення
                </button>
                <hr/>
                <div>
                    {posts?.map(post => <PostComponent key={post.id} post={post}/>)}
                </div>

            </div>
        </div>

    );
};