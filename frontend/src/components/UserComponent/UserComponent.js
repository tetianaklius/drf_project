import React from "react";


const UserComponent = ({user}) => {
    return (
        <div>
            User {user.id}: {user.profile?.name} {user.profile?.surname}; {user.email}
        </div>
    );
};

export {UserComponent};