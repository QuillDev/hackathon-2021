import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup} from "./refreshTokenSetup";
import {loginRegister} from "./loginRegister";

function Login(){
    const onSuccess = async ( res ) => {

        //get the profile
        const profile = res.profileObj;

        //try to login/register with the given profile object
        await loginRegister(res.profileObj);

        //start the token auth system
        refreshTokenSetup(res);

        //clear the local storage
        await localStorage.clear();

        //store user data
        localStorage.setItem("name", profile.name);
        localStorage.setItem("icon", profile.imageUrl);
        localStorage.setItem("email", profile.email);

        // go to join channel page
        window.location.href = "./dash";
    };

    const onFailure = ( res ) => {
        //console.log(`[Login Failed] res: ${res.toString()}`);
    };

    return (
        <div>
            <GoogleLogin
                clientId={window.env.CLIENT_ID}
                buttonText="Observe with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
                />
        </div>
    );
}

export default Login;