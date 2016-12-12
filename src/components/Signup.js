import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import PublicIcon from 'material-ui/svg-icons/social/public';
import AdPlacerSignup from './AdPlacerSignup';
import '../styles/Form.css';


const AD_PLACER_SIGNUP = 'ad-placer-signup';
const AD_PROVIDER_SIGNUP = 'ad-provider-signup';


export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { tb: AD_PLACER_SIGNUP };
    }

    static propTypes = {
        authProvider: PropTypes.object
    };

    goToAdPlacerSignup() {
        if (this.state.tb !== AD_PLACER_SIGNUP) this.setState({ tb: AD_PLACER_SIGNUP });
    }

    goTOAdProviderSignup() {
        if (this.state.tb !== AD_PROVIDER_SIGNUP) this.setState({ tb: AD_PROVIDER_SIGNUP });
    }

    render() {
        return (
            <div>
                <AppBar iconElementLeft={<IconButton><PublicIcon /></IconButton>} title="Sign Up" />
                <Tabs>
                    <Tab label="Ad Placer">
                        <AdPlacerSignup />
                    </Tab>
                    <Tab label="Ad Provider">
                        <div>Ad Provider signup form</div>
                    </Tab>
                </Tabs>
            </div>
        );
    }

}
