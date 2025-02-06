import {useForm} from "react-hook-form";
import styles from "./PostFormComponent.module.css"
import {useEffect, useState} from "react";


import {useLocation, useNavigate, useParams} from "react-router-dom";
import {postService} from "../../services/PostService";

export const PostFormComponent = () => {
    const {register, handleSubmit, reset} = useForm({});
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    const [error, setError] = useState(null);
    useEffect(() => {
    }, [error]);
    console.log(location.state)

    const [posts, setPosts] = useState([location?.state?.posts || ''])

    useEffect(() => {
        console.log(posts)
        postService.getAll().then(values => setPosts(values))
    }, []);


    const save = async (new_post) => {
        try {
            if (location?.state) {
                await postService.getById(id, new_post);
            } else {
                await postService.create(new_post);
            }
            navigate('/posts')
        } catch (err) {
            setError(JSON.stringify([{"err_message": err.message}, err.response.data]))
        }
    }


    return (<div>

        <div>
            <div className={styles.selects_wrap}>

                <div>
                    <form className={styles.form_wrap} onSubmit={handleSubmit(save)}>
                        <label className={styles.input_wrap}>Текст
                            <input type="text" placeholder={'text'}
                                   defaultValue={'my text'} {...register('text')}/>
                        </label>

                        <input type="text" placeholder={'title'} defaultValue={''} {...register('title')}/>
                        {/*<input type="choises" placeholder={'label'} defaultValue={''} {...register('label')}/>*/}

                        {(location?.state) ? <button>змінити</button> : <button>створтити</button>}

                    </form>
                </div>
            </div>
            <div>{error}</div>
        </div>
    </div>)
        ;
};
