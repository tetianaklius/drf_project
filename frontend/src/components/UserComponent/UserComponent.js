import React from "react";


const UserComponent = ({user}) => {
    return (
        <div>
            User {user.id}: {user.email}
        </div>
    );
};

export {UserComponent};