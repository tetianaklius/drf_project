import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {UserComponent} from "../UserComponent/UserComponent";

import {userService} from "../../services/userService";
import {refreshService} from "../../services/authService";
import {regionService} from "../../services/regionService";
import {cityService} from "../../services/cityService";
import styles from "./UsersSearchComponent.module.css";


export const UsersSearchComponent = () => {
    const {register, handleSubmit, reset} = useForm({});
    const [users, setUsers] = useState([])
    const [searchParams, setSearchParams] = useState('')

    const [error, setError] = useState(false);
    useEffect(() => {
    }, [error]);

    useEffect(() => {
        try {
            userService.search(searchParams).then((response) => {
                const data = response?.data
                const status = response["status"]
                if (!status) {
                    if (data) {
                        setUsers(data)
                    } else {
                        setUsers([response])
                    }
                }
                if (status === 401) {
                    refreshService.refresh().then(data => {
                        setError(prevState => !prevState)
                    })
                }
            })
        } catch (err) {
            console.log(err.data)
        }
    }, [searchParams]);


// age--------------------------------------------------------------------
    const [age, setAge] = useState(["--"])
    const [selectedAgeMin, setSelectedAgeMin] = useState("--")
    const [selectedAgeMax, setSelectedAgeMax] = useState("--")
    const onChangeAgeMin = (e) => setSelectedAgeMin(e.target.value)
    const onChangeAgeMax = (e) => setSelectedAgeMax(e.target.value)
    useEffect(() => {
        for (let i = 5; i < 100; i++) {
            setAge(prevState => [...prevState, i])
        }
    }, []);


// regions--------------------------------------------------------------------
    const [regions, setRegions] = useState([])
    const [selectedRegion, setSelectedRegion] = useState()
    const getValueRegion = () => regions.find(region => region?.name === selectedRegion)
    const onChangeRegion = (e) => setSelectedRegion(e.target.value)

    useEffect(() => {
        regionService.getAll().then(values => setRegions(prevState => [{name: "--"}, ...values]))
    }, []);


// cities--------------------------------------------------------------------
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState()
    const getValueCity = () => cities.find(city => city?.name === selectedCity)
    const onChangeCity = (e) => setSelectedCity(e.target.value)
    useEffect(() => {
        if (getValueRegion()?.value) {
            cityService.getByRegionId(getValueRegion()?.value).then(values => setCities([{name: "--"}, ...values]))
        } else {
            setCities([])
            setSelectedCity(null)
        }
    }, [selectedRegion]);


    const save = (params) => {

        if (getValueRegion()?.value && selectedRegion !== "--") params["region"] = getValueRegion()?.value
        if (getValueCity()?.value && selectedCity !== "--") params["city"] = getValueCity()?.value

        if (selectedAgeMin !== "--") params["age_min"] = selectedAgeMin
        if (selectedAgeMax !== "--") params["age_max"] = selectedAgeMax

        function replacer(key, value) {
            if (value === "") {
                return undefined;
            }
            return value;
        }

        const queryArr = JSON.stringify(params, replacer)
            .replaceAll("}", "")
            .replaceAll("{", "")
            .replaceAll(":", ",")
            .replaceAll('"', "")
            .split(",")

        let queryString = "?"

        for (let i = 0; i < queryArr.length - 1; i += 2) {
            queryString = queryString + queryArr[i] + "=" + queryArr[i + 1] + "&"
        }
        queryString = queryString.slice(0, -1)
        setSearchParams(queryString)
    }


    return (<div>
        <div className={styles.selects_wrap}>
            <div>
                <div className={styles.form_wrap}>
                    <div>

                        <form className={styles.form_wrap} onSubmit={handleSubmit(save)}>
                            <button className={styles.search_button}>Search</button>
                            <br/>
                            <label className={styles.input_wrap}>ID
                                <input type="text" placeholder={"ID"} {...register("pk")}/>
                            </label>
                            <label className={styles.input_wrap}>Email
                                <input type="text" placeholder={"Email"} {...register("email")}/>
                            </label>
                            <label className={styles.input_wrap}>Name
                                <input type="text" placeholder={"name"} {...register("name")}/>
                            </label>
                            <label className={styles.input_wrap}>Profession
                                <input type="text" placeholder={"Profession"}
                                       {...register("profession")}/>
                            </label>

                            <div className={styles.selects_wrap}>
                                <label className={styles.select_wrap}>Age for
                                    <select onChange={onChangeAgeMin} value={selectedAgeMin}>
                                        {age.map((opts, i) => <option key={i}>{opts}</option>)}
                                    </select>
                                </label>
                                <label className={styles.select_wrap}>Age to
                                    <select onChange={onChangeAgeMax} value={selectedAgeMax}>
                                        {age.map((opts, i) => <option key={i}>{opts}</option>)}
                                    </select>
                                </label>
                            </div>
                        </form>

                    </div>
                </div>
                <div>{error}</div>
                <div>
                    <label className={styles.select_wrap}>Region
                        <select onChange={onChangeRegion} size={10} value={getValueRegion()?.name}>
                            {regions.map((opts, i) => <option key={i}>{opts.name}</option>)}
                        </select>
                    </label>
                    <label className={styles.select_wrap}>City
                        <select onChange={onChangeCity} size={10} value={getValueCity()?.name}>
                            {cities.map((opts, i) => <option key={i}>{opts.name}</option>)}
                        </select>
                    </label>
                </div>
            </div>
            <div className={styles.users_wrap}>
                {users.map(user => <UserComponent key={user.id} user={user}/>)}
            </div>
        </div>
    </div>);
};
