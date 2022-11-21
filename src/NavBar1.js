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
     
      this.setState({isSignedUp: true, userName: user.userName});
      
    }
    else {
      this.setState({isSignedUp: false});
    }
  })
  .catch(()=>{
    console.log()
  });

  fetch('/api/cart/count')
  .then(response => response.json())
  .then(cartProductCount => {
    
    this.setState({cartProductCount: cartProductCount.cartProductCount})

  })
  .catch((e)=>{
    console.log(e)
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
        <div>
      <Link to="/cart">
      <img className = "cart-icon" src = "/images/shopping_cart.png" alt = "img"></img>
      <span className="cartCount">({this.props.cartProductCount >='0' ? this.props.cartProductCount: this.state.cartProductCount})</span>
      </Link>
      </div>
      <span className="login-signup">{logininfo}</span>
      {this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}
      </div>
    </header>


    );
  }
}



export default NavBar;