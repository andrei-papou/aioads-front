import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import AuthProvider from '../providers/auth-provider';
import '../styles/Anon.css';


class Anon extends Component {

    static propTypes = {
        authProvider: PropTypes.object
    };

    render() {
        const { authProvider, children } = this.props;

        return (
            <Paper zDepth={1} className="anon">
                {children && React.cloneElement(children, { authProvider })}
            </Paper>
        );
    }

}

export default connect(
    state => ({}),
    dispatch => ({
        authProvider: new AuthProvider(dispatch)
    })
)(Anon);
