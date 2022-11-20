import React from 'react';
import './LoginPage.css';
import './PopUp.css';
import './NavBar1.css';
import './NavBar2.css';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      messageLogin: '',
      messageSignup: ''
    };
  }


  onInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLoginClick = e => {
    e.preventDefault();
    const { email, userName, password } = this.state;
    fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ email, userName, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(res => {
    if (res.ok) {
      window.location.reload();
    }
    
    res.json().then((body) => {
        this.setState({messageSignup: ''});
        this.setState({messageLogin: body.error});
        // throw new Error(body.error)
    })

    })
    .catch((error) => {
      console.log(e)
      // this.errorMessage = error.message
      // this.setState({messageSignup: ''});
      // this.setState({messageLogin: this.errorMessage});
    });
  }

  onSignupClick = e => {
    e.preventDefault();
    const { email, userName, password } = this.state;
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, userName, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => {
      if (response.ok) {
        
        alert('User Signed Up! You can login now.')

      }
      response.json().then((body) => {
          this.setState({messageSignup: body.error});
          this.setState({messageLogin: ''});

          // throw new Error(body.error)
      })
    })
    .catch((error) => {
      console.log(e)

      // this.errorMessage = error.message
      // this.setState({messageSignup: this.errorMessage});
      // this.setState({messageLogin: ''});
    });
  }

  render() {
    return (
      <div className="LoginPage">
         <div className = 'loginHeader'>LOGIN / SIGNUP</div>
         <div className = 'loginError'>
      {this.state.messageLogin? <span className ='error-span'>{this.state.messageLogin}</span> : null} 
      {this.state.messageSignup ? <span className ='error-span'>{this.state.messageSignup}</span> : null}
      </div>
        <form className = 'form-data'>
        <div >
          <div>
          <label className='emailId-label'>Email-Id <span className = 'star'>*</span></label>
          
          <input className='emailId-input' placeholder="Enter Email-Id" name="email" required type="email" onInput={this.onInput} value={this.state.email}></input>
        </div>
        <div>
          <label className='userName-label'>Username <span className = 'star'>*</span></label>
          
          <input className='name-input' placeholder="Enter Username" name="userName" required type="text" onInput={this.onInput} value={this.state.userName}></input>
        </div>
        <div>
        <label className='password-label'>Password <span className = 'star'>*</span></label>
          
          <input className='password-input' placeholder="Enter Password" name="password" required type="password" onInput={this.onInput} value={this.state.password}></input>
        </div>
      </div>
          <div>
            <div>
             <input className='form-login-btn'  type="submit" onClick={this.onLoginClick} value="Login"></input>
            </div>
            <div>
              <hr className = "signupHorizontalLine"></hr>
              <label>New User ? </label>
             <input className='form-submit-btn'  type="submit" onClick={this.onSignupClick} value="Sign up"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
