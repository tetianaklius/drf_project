import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {userService} from "../../services/userService";
import {refreshService} from "../../services/authService";
import {RegisterComponent} from "../../components/RegisterComponent/RegisterComponent";
import styles from "./ProfilePage.module.css";


export const ProfilePage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
            try {
                userService.my_profile().then((response) => {
                    const data = response?.data
                    const status = response["status"]

                    console.log(response)

                    if (!status) {
                        if (data) {
                            setUser(data)
                        } else
                            setUser(response)
                    }
                    if (status === 401) {
                        refreshService.refresh().then(data => {
                            if (status === 401 && error) {
                                navigate("/login")
                            } else {
                                setError(true)
                            }
                        })
                    }
                })
            } catch (err) {
                console.log(err.data)
            }
        },
        [error]
    );


    return (
        <div className={styles.main}>
            <RegisterComponent user={user}/>
        </div>
    );
};