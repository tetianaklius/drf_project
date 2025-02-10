import React, {useEffect, useState} from 'react';

import {userService} from "../../services/userService";
import {refreshService} from "../../services/authService";
import {RegisterComponent} from "../../components/RegisterComponent/RegisterComponent";
import {useNavigate} from "react-router-dom";


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
        <div>
            <RegisterComponent user={user}/>
        </div>
    );
};