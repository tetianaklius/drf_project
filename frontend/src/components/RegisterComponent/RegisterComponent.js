import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {regionService} from "../../services/regionService";
import {cityService} from "../../services/cityService";
import {userService} from "../../services/userService";
import styles from "./RegisterComponent.module.css"


export const RegisterComponent = ({user}) => {
    const {register, handleSubmit} = useForm();
    const location = useLocation();

    const [error, setError] = useState(null);
    useEffect(() => {
    }, [error]);

    console.log((user?.profile?.age.toString()));

// regions--------------------------------------------------------------------
    const [regions, setRegions] = useState([""])
    const getNameRegion = (value) => regions.find(region => region?.value === value)
    useEffect(() => {
        regionService.getAll().then(values => setRegions(values))
    }, []);

// cities--------------------------------------------------------------------
    const [cities, setCities] = useState([user?.profile?.state || ""])
    const [selectedCity, setSelectedCity] = useState(user?.profile?.state?.name || "---")
    const getValueCity = () => cities.find(city => city?.name === selectedCity.split(" ----- ")[0])
    const onChangeCity = (e) => {
        setSelectedCity(e.target.value)
    }
    useEffect(() => {
        cityService.getAll().then(values => setCities(prevState => ["---", ...values]))
    }, []);

// age--------------------------------------------------------------------
    const [age, setAge] = useState([user?.profile?.age || "--"])
    const [selectedAge, setSelectedAge] = useState(user?.profile?.age || "--")
    const getValueAge = () => selectedAge
    const onChangeAge = (e) => setSelectedAge(e.target.value)
    useEffect(() => {
        for (let i = 14; i < 100; i++) {
            setAge(prevState => [...prevState, i])
        }
    }, []);


    const registerUser = async (new_user) => {
        try {
            if (selectedAge !== "--") new_user["profile"]["age"] = selectedAge
            if (getValueCity()?.value) new_user["profile"]["city"] = getValueCity()?.value

            if (user) {
                console.log(new_user)
                await userService.update(user?.id, new_user).then(data => console.log(data))

            } else {

                await userService.create(new_user).then(data => {
                    const msg = "Check your email to confirm registration "
                    alert(msg + data.email)
                    setError(msg + data.email)
                })
            }

        } catch (err) {
            setError(JSON.stringify([{"err_message": err.message}, err.response.data]))
        }
    };


    return (
        <div className={styles.register_box}>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit(registerUser)} className={styles.register_form}>
                <div className={styles.inputs_box}>
                    <input type="text" placeholder={"email"} disabled={user} {...register("email")}/>
                    <input type="text" placeholder={"password"} disabled={user} {...register("password")}/>

                    <label>
                        <input type="text" placeholder={"name"} defaultValue={user?.profile?.name}
                               {...register("profile.name")}/>
                    </label>
                    <label>
                        <input type="text" placeholder={"surname"} defaultValue={user?.profile?.surname}
                               {...register("profile.surname")}/>
                    </label>
                    <label>
                        <input type="text" placeholder={"profession"}
                               defaultValue={user?.profile?.profession} {...register("profile.profession")}/>
                    </label>
                    <input type="text" placeholder={"interests"}
                           defaultValue={user?.profile?.interests} {...register("profile.interests")}/>
                </div>
                <div className={styles.selects_box}>
                    <label className={styles.select_city}>City
                        <select onChange={onChangeCity} size={15}>
                            {cities.map((opts, i) => <option
                                key={i}>{opts?.name} ----- {getNameRegion(opts?.region)?.name}</option>)}
                        </select>
                    </label>

                    <label className={styles.select_age}>Age
                        <select onChange={onChangeAge} size={15} value={getValueAge()}>
                            {age.map((opts, i) => <option key={i}>{opts}</option>)}
                        </select>
                    </label>
                </div>

                {(user) ?
                    <button>Save</button> :
                    <button className={styles.register_button}>Register</button>}
                <div className={styles.error_msg}>{error}</div>
            </form>
        </div>
    );
};
