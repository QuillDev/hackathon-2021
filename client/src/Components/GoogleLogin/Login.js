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
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</Button>
                )}
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