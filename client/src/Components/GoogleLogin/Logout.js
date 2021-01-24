import React from "react";
import { GoogleLogout } from "react-google-login";


function Logout(){
    const onSuccess = () => {
        alert('Logout made successfully');
        window.location.href = "../";
    };

    return (
        <div>
            <GoogleLogout
                clientId={window.env.CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;