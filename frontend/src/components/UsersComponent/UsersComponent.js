import {useEffect, useState} from "react";
import {UserComponent} from "../UserComponent/UserComponent";
import {userService} from "../../services/userService";


export const UsersComponent = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(({data}) => setUsers(data))
    }, []);


    return (
        <div>
            {users.map(user => <UserComponent key={user.id} user={user}/>)}
        </div>
    );
};
