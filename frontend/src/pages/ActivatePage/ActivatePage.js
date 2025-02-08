import {useNavigate, useParams} from "react-router-dom";

import {authService} from "../../services/authService";


export const ActivatePage = () => {
    const navigate = useNavigate();
    const {token} = useParams();

    if (token) {
        authService.activate(token).then(user => {
            navigate("/login", {state: {email: user.email}});
        })
    }

    return (
        <div>
            <h2>Activation...........{token}</h2>
        </div>
    );
};

