import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.jsx';


class SignUpPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  // onChange handler method
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  // onSubmit handle method
  processForm(event) {
    event.preventDefault(); // prevents form component from default action (opens a new window)

    const name = this.state.user.name;
    const email = this.state.user.email;
    const password = this.state.user.password;

    var context = this;

    axios.post('/auth/signup', {
      name: name,
      email: email,
      password: password
    })
    .then((response) => {

      context.setState({
        errors: {}
      });

      console.log('The form is valid');
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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default SignUpPage;