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
<<<<<<< HEAD:client/src/Components/GoogleLogin/Login.js
                render={renderProps => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</Button>
                )}
                buttonText="Login"
=======
                buttonText="Observe with Google"
>>>>>>> 23ca7fea73e21a858fda0462c8e0eee490d62e9a:client/src/GoogleLogin/Login.js
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