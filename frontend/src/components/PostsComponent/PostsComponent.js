import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {postService as advertService} from "../../services/PostService";
import {PostComponent} from "../PostComponent/PostComponent";

export const PostsComponent = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])
    const [trigger, setTrigger] = useState(null)

    useEffect(() => {
        advertService.getAll().then(({data}) => setPosts(data))
    }, [trigger]);

    return (
        <div>
            <button onClick={() => {
                navigate("post_add")
            }}>Create post
            </button>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                {posts?.map(post => <PostComponent key={post.id} post={post}/>)}
            </div>
        </div>
    );
};
