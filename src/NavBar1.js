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
      userName: '',
      cartProductCount: ''
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

  fetch('/api/cart/count')
  .then(response => response.json())
  .then(cartProductCount => {
    console.log(cartProductCount.cartProductCount)
    console.log(this.props.cartProductCount)
    this.setState({cartProductCount: cartProductCount.cartProductCount})

  })
  .catch(()=>{
    console.log("error")
  })
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
  

  console.log(this.props.cartProductCount)

  let logininfo;
  
  if(this.state.isSignedUp) {
    logininfo=
    <div className="dropdown-nav" >
      <span>{this.state.userName}<img className = "dropdown-arrow" alt="img" src = "/images/down-arrow.svg"></img></span>
      <div className="dropdown-content">
        <Link to="/orders"><span className = "box">Orders</span></Link>
        <span className = "box" onClick={this.onLogout}>Logout</span>
      </div>
  </div>
  }
  else{
    logininfo=<div className = 'loginNavBar' onClick={this.togglePopUp}>LOGIN</div>
  }

  return (
    <header className="navbar">
      <Link to='/'><div className="companyLogo"><b className="logoY">E</b>-Store</div></Link>
      {this.props.displaySearch? <div></div>:<SearchBar searchProductResult={this.searchProductResult}/>}

      <div className='cartLogin'>
      <Link to="/cart"><img className = "cart-icon" src = "/images/shopping_cart.png" alt = "img"></img>
      <span>({this.props.cartProductCount? this.props.cartProductCount: this.state.cartProductCount})</span></Link>
      
      <span className="login-signup">{logininfo}</span>
      {this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}
      </div>
    </header>


    );
  }
}



export default NavBar;