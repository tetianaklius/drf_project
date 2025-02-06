import React from 'react';
import {useNavigate} from "react-router-dom";

export const PostComponent = ({post}) => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                {post.id}. {post.title}
            </div>
            <button onClick={() => {
                navigate(`post_details/${post.id}`)
            }}>Post details
            </button>
            <button onClick={() => {
                navigate(`post_update/${post.id}`, {state: post})
            }}>post update {post.id}
            </button>
        </div>
    );
};
