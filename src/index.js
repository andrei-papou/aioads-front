import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Authentication from './containers/Authentication';
import Anon from './components/Anon';
import Login from './components/Login';
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
                    </Route>
                </Route>
            </Router>
    </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
