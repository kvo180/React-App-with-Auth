import React from 'react';
import ReactDom from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';

// required for material-ui to function properly
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router>
      <div>
        <Base />

        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignUpPage}/>
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDom.render(<App />, document.getElementById('app'));