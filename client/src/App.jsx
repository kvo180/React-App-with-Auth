import React from 'react';
import ReactDom from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // method that returns material-ui theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // material-ui component
import injectTapEventPlugin from 'react-tap-event-plugin'; // required for material-ui to function properly
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'; // react-router v4
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';

// required for material-ui to function properly
injectTapEventPlugin();
console.log(Auth.isUserAuthenticated());
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('mounted');
  }

  componentDidUpdate() {
    console.log('updated');
  }

  // shouldComponentUpdate() {
  //   return true;
  // }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            <Base />

            <Route exact path="/" component={Auth.isUserAuthenticated() ? DashboardPage : HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LoginPage}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
};

ReactDom.render(<App />, document.getElementById('app'));