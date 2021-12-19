import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      fetch('/api/users/me').then(user => {
        if (user.status !== 200) {
          window.location = '/';
        }
        return user.json();
      })
      .then(user => {
          this.setState({ ...user });
      });
  }

  onInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  onUpdate = () => {
    const { firstName, lastName } = this.state;
    fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => {
      if (res.status === 204) {
        window.location = '/profile';
      }
    });
  }

  onLogout = () => {
    fetch('/api/sessions/me', {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 204) {
        window.location = '/';
      }
    });
  }

  render() {
    return (<div className="Profile">
        <div>Email: {this.state.email}</div>
          <div>First Name: <input name="firstName" onInput={this.onInput} value={this.state.firstName || ''}></input></div>
          <div>Last Name: <input name="lastName" onInput={this.onInput} value={this.state.lastName || ''}></input></div>
          <div><input type="button" onClick={this.onUpdate} value="Update"></input></div>
          <div><input type="button" onClick={this.onLogout} value="Logout"></input></div>
      </div>);
  }
}

export default Profile;
