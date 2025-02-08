import React from "react";


const UserComponent = ({user}) => {
    return (
        <div>
            {user.email}
        </div>
    );
};

export {UserComponent};