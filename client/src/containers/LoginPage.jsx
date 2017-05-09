import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage: successMessage,
      user: {
        email: '',
        password: ''
      },
      loggedIn: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentWillMount() {
    if (Auth.isUserAuthenticated()) {
      Auth.deauthenticateUser();
    }
  }

  // onChange handler method
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user: user
    });
  }

  // onSubmit handle method
  processForm(event) {
    event.preventDefault(); // prevents form component from default action (opens a new window)

    const name = this.state.user.name;
    const email = this.state.user.email;
    const password = this.state.user.password;

    var context = this;

    axios.post('/auth/login', {
      email: email,
      password: password
    })
    .then((response) => {

      console.log('The form is valid');

      //save the token
      Auth.authenticateUser(response.data.token);

      context.setState({
        errors: {},
        loggedIn: true
      });

      console.log('logged in:', Auth.isUserAuthenticated());
      console.log(context);
      // context.props.history.push('/');
      // console.log(response.data);
    })
    .catch((err) => {
      var errors = err.response.data.errors ? err.response.data.errors : {};
      errors.summary = err.response.data.message;

      context.setState({
        errors: errors
      });
    });
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />
        {this.state.loggedIn && <Redirect push to="/"/>}
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;