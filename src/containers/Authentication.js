import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { UserTypes } from '../config';
import AuthProvider from '../providers/auth-provider';
import '../styles/Authentication.css';


class Authentication extends Component {

    static PropTypes = {
        user: PropTypes.object.isRequired,
        routerActions: PropTypes.object.isRequired,
        authProvider: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    handleAnonUser() {
        const { routerActions } = this.props;
        routerActions.push({pathname: '/anon'});
    }

    handleAuthedUser(user) {
        const { routerActions } = this.props;
        switch (user.type) {
            case UserTypes.PROVIDER:
                routerActions.push({pathname: '/provider'});
                break;
            case UserTypes.PLACER:
                routerActions.push({pathname: '/placer'});
                break;
            default:
                break;
        }
    }

    loadingOn() {
        this.setState({ loading: true });
    }

    loadingOff() {
        this.setState({ loading: false });
    }

    componentDidMount() {
        const { user, authProvider } = this.props;

        if (!user.type) {
            this.loadingOn();
            authProvider.getAccountData().then(result => {
                this.loadingOff();
                if (result) {
                    this.handleAuthedUser(user);
                } else {
                    this.handleAnonUser();
                }
            });
        } else {
            this.handleAuthedUser(user);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const { user, authProvider } = nextProps;

            if (!user.type) {
                this.loadingOn();
                authProvider.getAccountData().then(result => {
                    this.loadingOff();
                    if (result) {
                        this.handleAuthedUser(user);
                    } else {
                        this.handleAnonUser();
                    }
                });
            } else {
                this.handleAuthedUser(user);
            }
        }
    }

    render() {
        return this.state.loading ? (
            <div className="auth-loader">
                <RefreshIndicator size={160} left={10} top={0} status="loading" />
            </div>
        ) : this.props.children;
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
