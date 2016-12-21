import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import PublicIcon from 'material-ui/svg-icons/social/public';
import AdPlacerSignup from './AdPlacerSignup';
import AdProviderSignup from './AdProviderSignup';
import '../styles/Form.css';


const AD_PLACER_SIGNUP = 'ad-placer-signup';
const AD_PROVIDER_SIGNUP = 'ad-provider-signup';


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


'https://robo-pm-dev.stratifi.com/api/finfolio/report/accountbymodel/7b1f9c58-7641-4222-9c41-45d88787f6be?token=WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ.Cm66yQ.7J671CvhSZtT8mX9ZFD6yLs96K8&start_date=08/31/2016&period=daily&strategy=LOGe%20US%20Large%20Cap'
'https://robo-pm-dev.stratifi.com/api/finfolio/report/accountbymodel/7b1f9c58-7641-4222-9c41-45d88787?token=WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ.Cm66yQ.7J671CvhSZtT8mX9ZFD6yLs96K8&strategy=LOGe+US+Large+Cap&start_date=01/01/2016&period=daily'
