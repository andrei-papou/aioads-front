import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { UserTypes } from '../config';
import AuthProvider from '../providers/auth-provider';

class Authentication extends Component {

    static PropTypes = {
        user: PropTypes.object.isRequired,
        routerActions: PropTypes.object.isRequired,
        authProvider: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { user, routerActions, authProvider } = this.props;

        authProvider.checkAuth(user);
        switch (user.type) {
            case UserTypes.PROVIDER:
                routerActions.push({pathname: '/provider'});
                break;
            case UserTypes.PLACER:
                routerActions.push({pathname: '/placer'});
                break;
            default:
                routerActions.push({pathname: '/anon'});
                break;
        }
    }

    render() {
        const { authProvider, children } = this.props;
        return children && React.cloneElement(children, { authProvider });
    }

}

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        routerActions: bindActionCreators(routerActions, dispatch),
        authProvider: new AuthProvider(dispatch)
    })
)(Authentication);
