import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import AuthProvider from '../providers/auth-provider';


class AdProvider extends Component {

    static propTypes = {
        authProvider: PropTypes.object.isRequired
    };

    render() {
        const { authProvider, children } = this.props;

        return (
            <div>
                <AppBar title="AioAds"
                        iconElementLeft={<span />}
                        iconElementRight={<RaisedButton style={{height: 47}}
                                                        label="Logout"
                                                        onClick={() => authProvider.logout()} />} />
                <div>{children}</div>
            </div>
        );
    }

}


export default connect(
    state => ({}),
    dispatch => ({
        authProvider: new AuthProvider(dispatch)
    })
)(AdProvider);
