import React from 'react';
import { Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
    const { authState, authService } = useOktaAuth();

    if (authState.isPending) {
        return <div> Loading... </div>
    }

    const button = authState.isAuthenticated ?
        <button onClick={() => { authService.logout() }}>Logout</button> :
        <button onClick={() => { authService.login() }}>Login</button>;

    return (
        <div>
            <Link to='/' >Home</Link><br />
            <Link to='/protected'>Protected</Link><br />
            {button}
            {/* <Router>
                <Switch>
                    <Route exact path="/" component={withRouter(Home)} />
                    <Route exact path="/protected" component={withRouter(Protected)} />
                </Switch>
            </Router> */}
        </div>

    )

}

export default Home;