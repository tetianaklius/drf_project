import {useEffect, useState} from "react";

import {refreshService} from "../../services/authService";
import {PostComponent} from "../PostComponent/PostComponent";
import {PostFormComponent} from "../PostFormComponent/PostFormComponent";
import {postService} from "../../services/postService";
import styles from "./PostsComponent.module.css";


export const PostsComponent = () => {
        const [formVisible, setFormVisible] = useState(false)
        const [error, setError] = useState(false)
        const [token, setToken] = useState(true)
        const [posts, setPosts] = useState()
        const [paginator, setPaginator] = useState({
                "total_items": 0,
                "total_pages": 0,
                "prev": false,
                "next": false
            }
        )
        const [page, setPage] = useState(1)

        useEffect(() => {

        }, [formVisible]);

        useEffect(() => {

                try {
                    postService.getAll(page).then((response) => {
                        const data = response?.data
                        const status = response["status"]

                        if (!status) {
                            setPosts(data)
                            setPaginator({
                                total_items: response.total_items,
                                total_pages: response.total_pages,
                                next: response.next,
                                prev: response.prev,
                            })
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
                    console.log(err.message)
                }
            },
            [token, page]
        );

        const data_props = {
            "form_visible": setFormVisible, "set_error": setError
        }
        console.log(page)

        return (
            <div className={styles.component_wrap}>

                <div className={styles.form_box}>
                    <div className={styles.form}>
                        {formVisible ? (<PostFormComponent data={data_props}/>) : <div></div>}
                    </div>
                    <div className={styles.error_msg}>
                        {error}
                    </div>
                    <button className={styles.add_button}
                            onClick={() => {
                                setFormVisible(true)
                            }} disabled={formVisible}>Add post
                    </button>
                </div>
                <div className={styles.pag_buttons_wrap}>
                    <button className={styles.pag_button} disabled={!paginator.prev} onClick={() => {
                        if (paginator.prev) {
                            setPage(prevState => prevState - 1
                            )
                        }
                    }}>&#8592;
                    </button>
                    <button className={styles.pag_button} disabled={!paginator.next} onClick={() => {
                        if (paginator.next) {
                            setPage(prevState => prevState + 1)
                        }
                    }}>&#8594;
                    </button>
                </div>

                <div className={styles.posts_box}>
                    {posts?.map(post => <PostComponent key={post.id} post={post}/>)}
                </div>

            </div>
        );
    }
;
