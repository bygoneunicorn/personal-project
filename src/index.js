import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';

ReactDOM.render(
<Provider store={store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
unregister();
