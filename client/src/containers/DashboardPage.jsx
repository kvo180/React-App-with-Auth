import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import axios from 'axios';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  componentDidMount() {
    var context = this;

    var config = {
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`
      }
    };

    axios.get('/api/dashboard', config)
    .then((response) => {
      context.setState({
        secretData: response.message
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message
    //     });
    //   }
    // });
    // xhr.send();
  }

  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;