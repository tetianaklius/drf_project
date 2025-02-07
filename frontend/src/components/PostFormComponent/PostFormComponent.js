import {useForm} from "react-hook-form";
import styles from "./PostFormComponent.module.css"
import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {postService} from "../../services/postService";
import {postLabelService} from "../../services/postLabelService";

export const PostFormComponent = ({data}) => {
    const {register, handleSubmit, reset} = useForm({});
    const {id} = useParams();
    const navigate = useNavigate()

    const {form_visible, set_error, post, set_post} = data

    // const [error, setError] = useState(null);

    // useEffect(() => {
    // }, [error]);


    const [postLabels, setPostLabels] = useState([post?.label || {name: 'Travels', value: 1}])
    const [selectedPostLabel, setSelectedPostLabel] = useState(post?.label?.name || 'Travels')
    const getValuePostLabel = () => postLabels.find(lbl => lbl?.name === selectedPostLabel)
    const onChangePostLabel = (e) => {
        setSelectedPostLabel(e.target.value)
    }
    useEffect(() => {
        postLabelService.getAll().then(values => setPostLabels(values))
    }, []);


    const save = async (new_post) => {
        try {
            new_post['label'] = getValuePostLabel()?.value
            console.log(new_post)
            if (post) {
                await postService.update(id, new_post).then(data => set_post(data));
                form_visible(false)
            } else {
                await postService.create(new_post).then(data => {
                    navigate(`post_details/${data.id}`)
                })
            }

        } catch (err) {
            // setError(JSON.stringify([{"err_message": err.message}]))
            set_error(JSON.stringify([{"err_message": err.message}]))
            form_visible(false)
        }
    }

    return (<div>

        <div>
            <div className={styles.selects_wrap}>

                <div>
                    <form className={styles.form_wrap} onSubmit={handleSubmit(save)}>

                        <label className={styles.select_wrap}>Label
                            <select onChange={onChangePostLabel} size={10} value={getValuePostLabel()?.name}>
                                {postLabels.map((opts, i) => <option key={i}>{opts.name}</option>)}
                            </select>
                        </label>

                        <label className={styles.input_wrap}>Текст
                            <input type="text" placeholder={'text'}
                                   defaultValue={post?.text || 'my text'} {...register('text')}/>
                        </label>

                        <input type="text" placeholder={'title'}
                               defaultValue={post?.title || 'Title'} {...register('title')}/>
                        {/*<input type="text" placeholder={'label'}*/}
                        {/*       defaultValue={post?.label || '1'} {...register('label')}/>*/}

                        {(post) ? <button>змінити</button> : <button>створтити</button>}

                    </form>
                </div>
            </div>
            {/*<div>{error}</div>*/}
        </div>
    </div>)
        ;
};