import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import PublicIcon from 'material-ui/svg-icons/social/public';
import AdPlacerSignup from './AdPlacerSignup';
import AdProviderSignup from './AdProviderSignup';
import '../styles/Form.css';


export default class Signup extends Component {

    static propTypes = {
        authProvider: PropTypes.object
    };

    render() {
        const { authProvider } = this.props;

        return (
            <div>
                <AppBar iconElementLeft={<IconButton><PublicIcon /></IconButton>} title="Sign Up" />
                <Tabs>
                    <Tab label="Ad Placer">
                        <AdPlacerSignup authProvider={authProvider} />
                    </Tab>
                    <Tab label="Ad Provider">
                        <AdProviderSignup authProvider={authProvider} />
                    </Tab>
                </Tabs>
            </div>
        );
    }

}
