import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {authService} from "../../services/authService";


export const RegisterComponent= () => {
    const {register, handleSubmit} = useForm();

    const [error, setError] = useState(null);
    useEffect(() => {
    }, [error]);


    const registerUser = async (user) => {
        try {
            await authService.register(user).then(data => {
                const msg = "Для підтвердження реєстрації перейдіть за посиланням на вашому email  "
                alert(msg + data.email)
                setError(msg+ data.email)
            })
        } catch (err) {
            setError(JSON.stringify([{"err_message": err.message}, err.response.data]))
        }
    };

    return (
        <div>
            <h2>ЗАРЕЄСТРУЙТЕСЬ</h2>
            <form onSubmit={handleSubmit(registerUser)}>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <input type="text" placeholder={'username'} {...register('profile.name')}/>
                <input type="text" placeholder={'surname'} {...register('profile.surname')}/>
                <input type="text" placeholder={'age'} {...register('profile.age')}/>
                <button>Register</button>
                {/*{error && <div>error! - {error}</div>}*/}
                <div>{error}</div>
            </form>
        </div>
    );
};


