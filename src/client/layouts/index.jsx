import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';

import PrivateLayout from './private';
import PublicLayout  from './public';

import privateRoutes from './routes/privateRoutes';
import publicRoutes  from './routes/publicRoutes';
import sessionRoutes from './routes/sessionRoutes';

import { UserActions } from '../user/UserActions';
import Login from '../user/Login';
import NotFound from './public/NotFound';

import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const resetStyles = (theme => ({
    "@global": {
        html: {
        },
        body: {
        },
        a: {
            textDecoration: 'none'
        },
    }
}))
const globalTheme = createMuiTheme({
    appBarStyle: {
        background: 'rgba(255,255,255,0.3)',
        boxShadow: 'none'
    }
})
class Template extends Component {

    constructor(props) {
        super(props);
        this.userActions = new UserActions(this.props.dispatch);
     }

    componentWillMount() {
        this.userActions.verify();
    }

    render() {
        const user = this.props.user;
        if (!user.verified) { return(<div>Loading...</div>); }
        return (
        <MuiThemeProvider theme={globalTheme}>
        <BrowserRouter>
            <Switch>
                { _.map(publicRoutes, (route, key) => {
                    const { component, path } = route;
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                            user.logged ?  (
                            <PrivateLayout component={component} route={route} user={user} userActions={this.userActions} />
                            ) : (
                            <PublicLayout component={component} route={route} user={user}/>                            
                            )
                            }
                        />
                    )
                }) }

                { _.map(privateRoutes, (route, key) => {
                    const { component, path } = route;
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                user.logged ? (
                                <PrivateLayout component={component} route={route} user={user} userActions={this.userActions} />
                                ) : (
                                <PublicLayout component={Login} route={route} user={user}/>
                                )
                            }
                        />
                    )
                }) }

                { _.map(sessionRoutes, (route, key) => {
                    const { component, path } = route;
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                user.logged ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <PublicLayout component={component} route={route} user={user}/>
                                )
                            }
                        />
                    )
                }) }
                <Route component={ NotFound } />
            </Switch>
        </BrowserRouter>
        </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withStyles(resetStyles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Template));
