import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {authService} from "../../services/authService";


export const LoginPage = () => {
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" defaultValue={location.state?.email}
                       placeholder={"email"} {...register("email")}/>
                <input type="text"
                       placeholder={"password"} {...register("password")}/>
                <button>login</button>
                <div>{error}</div>
            </form>
        </div>
    );
};

