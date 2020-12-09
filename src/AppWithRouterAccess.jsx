import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './dashboard/home';
import SignIn from './auth/SignIn';
import Protected from './protected/protected';

const AppWithRouterAccess = () => {
    const history = useHistory();
    const onAuthRequired = () => {
        history.push('/login');
    };

    return (
        <Security issuer={process.env.OKTAISSUER} 
            clientId={process.env.OKTACLIENTID}
            redirectUri={window.location.origin + '/implicit/callback'}
            onAuthRequired={onAuthRequired}
            pkce={true} >
            <Route path='/' exact={true} component={Home} />
            <SecureRoute path='/protected' component={Protected} />
            <Route path='/login' render={() => <SignIn issuer={process.env.OKTAISSUER} />} />
            <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
};
export default AppWithRouterAccess;