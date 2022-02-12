import React from 'react';
import { Link } from 'react-router-dom';
import PopUp from './PopUp';
import SearchBar from './SearchBar';
import './NavBar1.css';
import './index.css';

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSignedUp: false,
      isPopUp: false,
      userName: ''
    };
}

componentDidMount() {
  fetch('/api/users/me')
  .then(response => response.json())
  .then(user => {
    if (user) {
      console.log(user)
      this.setState({isSignedUp: true, userName: user.userName});
      console.log('hi');
    }
    else {
      this.setState({isSignedUp: false});
    }
  });
}


onInput = event => {
  this.setState({ [event.target.name]: event.target.value });
}


onLogout = () => {
  fetch('/api/sessions/me', {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 204) {
      console.log('inside logout');
      this.setState({isSignedUp: false});
      window.location.reload();
    }
  });
}

togglePopUp =() => {
  this.setState({isPopUp:!this.state.isPopUp})
}


searchProductResult = (productsSearchResult) => {
  this.props.getSearchResult(productsSearchResult);
}


render() {
  
  let logininfo;
  
  if(this.state.isSignedUp) {
    logininfo=
    <div className="dropdown-nav" ><span>{this.state.userName}<img className = "dropdown-arrow" alt="img" src = "/images/down-arrow.svg"></img></span>
    <div className="dropdown-content">
      <span className = "box" >Orders</span>
      <span className = "box" onClick={this.onLogout}>Logout</span>
    </div>
  </div>
  }
  else{
    logininfo=<div onClick={this.togglePopUp}>Login</div>
  }

  return (
<header className="navbar">
   <Link to='/'><div className="companyLogo"><b className="logoY">E</b>-Store</div></Link>
   {this.props.displaySearch? <div></div>:<SearchBar searchProductResult={this.searchProductResult}/>}
   <img className = "cart-icon" src = "/images/shopping_cart.png" alt = "img"></img>
   <span className="login-signup">{logininfo}</span>
   {this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}
   
</header>


    );
  }
}



export default NavBar;