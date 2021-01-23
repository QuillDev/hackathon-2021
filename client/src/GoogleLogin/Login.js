import React from "react";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup} from "./refreshTokenSetup";
import {loginRegister} from "./loginRegister";
import Button from 'react-bootstrap/Button';

function Login(){
    const onSuccess = ( res ) => {
        //try to login/register with the given profile object
        loginRegister(res.profileObj);

        //start the token auth system
        refreshTokenSetup(res);
    };

    const onFailure = ( res ) => {
        console.log(`[Login Failed] res: ${res}`);
    };

    return (
        <div>
            <GoogleLogin
                clientId={window.env.CLIENT_ID}
                render={renderProps => (
                    <Button variant={"dark"} onClick={renderProps.onClick} disabled={renderProps.disabled}>Observe with Google</Button>
                )}
                buttonText="Login"
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