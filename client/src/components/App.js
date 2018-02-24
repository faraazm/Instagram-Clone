import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import Home from './Home';
import Nav from './Nav';
import SignUp from './Auth/SignUp';
import Landing from './Landing/Landing';
import Profile from './Profile/Profile';
import requireAuth from './Auth/requireAuth';

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Nav/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signUp" component={SignUp} />
                    <Route exact path="/profile" component={requireAuth(Profile)} />
                    <Route exact path="/landing" component={requireAuth(Landing)} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;