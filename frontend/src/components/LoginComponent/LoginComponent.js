import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {authService} from "../../services/authService";
import styles from "./LoginComponent.module.css";


export const LoginComponent = () => {
    const location = useLocation();
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    useEffect(() => {
    }, [error]);

    const onSubmit = async (user) => {
        try {
            await authService.login(user)
            navigate("/posts")
        } catch (err) {
            setError(JSON.stringify([{"err_message": err.message}, err.response.data]))
        }
    };

    return (
        <div className={styles.login_box}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
                <input type="text" id={styles.input_1} defaultValue={location.state?.email}
                       placeholder={"email"} {...register("email")}/>
                <input type="text" id={styles.input_2}
                       placeholder={"password"} {...register("password")}/>
                <button className={styles.login_button}>login</button>
                <div className={styles.error_msg}>{error}</div>
            </form>
        </div>
    );
};
