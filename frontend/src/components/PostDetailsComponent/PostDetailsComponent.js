import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {postService} from "../../services/PostService";

export const PostDetailsComponent = () => {
    const {id} = useParams();
    const [post, setPost] = useState({})

    useEffect(() => {
        postService.getById(id).then((data) => {
            setPost(data);
        })
    }, []);

    return (
        <div>
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
        </div>
    );
};
