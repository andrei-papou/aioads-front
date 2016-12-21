import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AuthProvider from '../providers/auth-provider';


class AdProvider extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        authProvider: PropTypes.object.isRequired
    };

    render() {
        const { authProvider } = this.props;

        return (
            <div>
                <AppBar title="Title"
                        iconElementRight={
                            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Profile" />
                                <MenuItem primaryText="Settings" />
                                <MenuItem primaryText="Logout" onClick={() => authProvider.logout()} />
                            </IconMenu>
                        } />
            </div>
        );
    }

}


export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        authProvider: new AuthProvider(dispatch)
    })
)(AdProvider);
