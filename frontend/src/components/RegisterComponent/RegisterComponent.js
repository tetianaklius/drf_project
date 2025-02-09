import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

import {authService} from "../../services/authService";
import {regionService} from "../../services/regionService";
import {cityService} from "../../services/cityService";
import styles from "./RegisterComponent.module.css"
import {useLocation} from "react-router-dom";


export const RegisterComponent = () => {
    const {register, handleSubmit} = useForm();
    const location = useLocation();

    const [error, setError] = useState(null);
    useEffect(() => {
    }, [error]);

// regions--------------------------------------------------------------------
    const [regions, setRegions] = useState([location?.state?.region || ''])
    const getNameRegion = (value) => regions.find(region => region?.value === value)
    useEffect(() => {
        regionService.getAll().then(values => setRegions(values))
    }, []);

// cities--------------------------------------------------------------------
    const [cities, setCities] = useState([location?.state?.city || ''])
    const [selectedCity, setSelectedCity] = useState(location?.state?.city?.name || '---')
    const getValueCity = () => cities.find(city => city?.name === selectedCity.split(' ----- ')[0])
    const onChangeCity = (e) => {
        setSelectedCity(e.target.value)
    }
    useEffect(() => {
        cityService.getAll().then(values => setCities(prevState => ['---', ...values]))
    }, []);

// age--------------------------------------------------------------------
    const [age, setAge] = useState(["--"])
    const [selectedAge, setSelectedAge] = useState("--")
    const onChangeAge = (e) => setSelectedAge(e.target.value)
    useEffect(() => {
        for (let i = 5; i < 100; i++) {
            setAge(prevState => [...prevState, i])
        }
    }, []);


    const registerUser = async (user) => {
        try {
            if (selectedAge !== "--") user['profile']['age'] = selectedAge
            if (getValueCity()?.value) user['profile']['city'] = getValueCity()?.value

            if (location?.state) {
                console.log(location?.state)
                // await authService.register(user).then(data => console.log(data))
            } else {
                console.log(user)
                await authService.register(user).then(data => {
                    const msg = "Check your email to confirm registration"
                    alert(msg + data.email)
                    setError(msg + data.email)
                })
            }

        } catch (err) {
            setError(JSON.stringify([{"err_message": err.message}, err.response.data]))
        }
    };


    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(registerUser)}>
                <input type="text" placeholder={"email"} {...register("email")}/>
                <input type="text" placeholder={"password"} {...register("password")}/>
                <input type="text" placeholder={'username'} {...register("profile.name")}/>
                <input type="text" placeholder={"surname"} {...register("profile.surname")}/>
                <input type="text" placeholder={"profession"} {...register("profile.profession")}/>

                <div className={styles.selects_wrap}>
                    <label className={styles.select_wrap}>City
                        <select onChange={onChangeCity} size={15} >
                            {cities.map((opts, i) => <option
                                key={i}>{opts?.name} ----- {getNameRegion(opts?.region)?.name}</option>)}
                        </select>
                    </label>

                    <label className={styles.select_age}>Age
                        <select onChange={onChangeAge} size={15} value={selectedAge}>
                            {age.map((opts, i) => <option key={i}>{opts}</option>)}
                        </select>
                    </label>
                </div>


                {(location?.state) ? <button>Save</button> : <button>Register</button>}
                <div>{error}</div>
            </form>
        </div>
    );
};
