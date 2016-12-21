import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AuthProvider from '../providers/auth-provider';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';


class AdProvider extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        authProvider: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { drawerShown: false };
        this.showDrawer = this.showDrawer.bind(this);
    }

    showDrawer() {
        this.setState({ drawerShown: true });
    }

    closeDrawer() {
        this.setState({ drawerShown: false });
    }

    render() {
        const { authProvider, children } = this.props;

        return (
            <div>
                <AppBar title="AioAds"
                        iconElementLeft={<IconButton onClick={this.showDrawer}><NavigationMenu /></IconButton>}
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
                <Drawer docked={false}
                        width={200}
                        open={this.state.drawerShown}
                        onRequestChange={(open) => this.setState({ drawerShown: open })}
                >
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Browse current orders</MenuItem>
                    <MenuItem>Place advert order</MenuItem>
                </Drawer>

                <div>{children}</div>
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
