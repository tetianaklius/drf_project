import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

import {postService} from "../../services/postService";
import {postLabelService} from "../../services/postLabelService";
import styles from "./PostFormComponent.module.css"


export const PostFormComponent = ({data}) => {
    const {register, handleSubmit, reset} = useForm({});
    const {id} = useParams();
    const navigate = useNavigate()

    const {form_visible, set_error, post, set_post} = data

    const [postLabels, setPostLabels] = useState([post?.label || {name: "Travels", value: 1}])
    const [selectedPostLabel, setSelectedPostLabel] = useState(post?.label?.name || "Travels")
    const getValuePostLabel = () => postLabels.find(lbl => lbl?.name === selectedPostLabel)
    const onChangePostLabel = (e) => {
        setSelectedPostLabel(e.target.value)
    }
    useEffect(() => {
        postLabelService.getAll().then(values => setPostLabels(values))
    }, []);


    const save = async (new_post) => {
        try {
            new_post["label"] = getValuePostLabel()?.value
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
            set_error(JSON.stringify([{"err_message": err.message}]) + JSON.stringify([{"err_message": err.response.data}]))
            form_visible(false)
        }
    }

    return (<div>
        <form className={styles.form_wrap} onSubmit={handleSubmit(save)}>
            <label className={styles.select_wrap}>Topic
                <select onChange={onChangePostLabel} size={10} value={getValuePostLabel()?.name}>
                    {postLabels.map((opts, i) => <option key={i}>{opts.name}</option>)}
                </select>
            </label>
            <label className={styles.input_wrap}>Title
                <input type="text" placeholder={"title"} required
                       defaultValue={post?.title || ""} {...register("title")}/>
            </label>
            <label className={styles.input_wrap}>Text
                <input type="text" placeholder={"text"} required
                       defaultValue={post?.text || ""} {...register("text")}/>
            </label>
            <div>
                {(post) ? <button>Update</button> : <button className={styles.add_button}>Add</button>}
            </div>
        </form>
    </div>);
};
