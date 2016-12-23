import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Authentication from './containers/Authentication';
import Anon from './containers/Anon';
import AdPlacer from './containers/AdPlacer';
import AdProvider from './containers/AdProvider';
import AdvertList from './containers/AdvertList';
import AdvertObject from './containers/AdvertObject';
import Login from './components/Login';
import Signup from './components/Signup';
import getStore from './store';


injectTapEventPlugin();

const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store} >
        <MuiThemeProvider>
            <Router history={history}>
                <Route path="/" component={Authentication} >
                    <Route path="/anon" component={Anon}>
                        <IndexRedirect to="/anon/login" />
                        <Route path="/anon/login" component={Login} />
                        <Route path="/anon/signup" component={Signup} />
                    </Route>
                    <Route path="/placer" component={AdPlacer} />
                    <Route path="/provider" component={AdProvider}>
                        <IndexRedirect to="/provider/adverts" />
                        <Route path="/provider/adverts" component={AdvertList} />
                        <Route path="/provider/adverts/:id" component={AdvertObject} />
                    </Route>
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
