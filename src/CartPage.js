import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import './CartPage.css';
import './PopUp.css';
import './LoginPage.css';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import PopUp from './PopUp';



class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: [],
            totalCartPrice: '',
            isSignedUp: false,
            isPopUp: false,
        };
    }

    componentDidMount() {

        fetch('/api/users/me').then(user => {
            console.log(user)
            if (user.status === 200) {
              this.setState({isSignedUp: true});
              console.log(this.state.isSignedUp);
            }
            else {
              this.setState({isSignedUp: false});
              console.log(this.state.isSignedUp);
            }
          })
          .catch(()=>{
              console.log("error")
        })

        fetch(`/api/cart/me`)
        .then(response=>response.json())
        .then(cartProducts=> {
            
            if(cartProducts.error !== "No cart products") {
                this.setState({productList: cartProducts[0].productList})
                this.setState({totalCartPrice: cartProducts[0].totalCartPrice})
            }
            else {
                this.setState({productList: []})
                this.setState({totalCartPrice: 0})
            }
            
            console.log(this.state.totalCartPrice)
            console.log("hello")
        })
        console.log("this popup")
        console.log(this.state.isPopUp)
          
    }
      

    decreaseClick(productId) {
        console.log("inside decrease click")
        console.log(productId)
        fetch(`/api/cart/${productId}/decreaseCount`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res =>res.json())
        .then(cartProduct=>{
            console.log(cartProduct.cartProduct[0].productList)
            this.setState({productList: cartProduct.cartProduct[0].productList})
            this.setState({totalCartPrice: cartProduct.cartProduct[0].totalCartPrice})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    increaseClick(productId) {
        console.log("inside increase click")
        console.log(productId)
        fetch(`/api/cart/${productId}/increaseCount`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res =>res.json())
        .then(cartProduct=>{
            console.log(cartProduct.cartProduct[0].productList)
            this.setState({productList: cartProduct.cartProduct[0].productList})
            this.setState({totalCartPrice: cartProduct.cartProduct[0].totalCartPrice})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    removeClick(productId) {
        console.log("inside remove click")
        console.log(productId)
        fetch(`/api/cart/${productId}`, {
            method: 'DELETE'
        })
        .then(res =>res.json())
        .then(cartProduct=>{
            console.log(cartProduct.cartProduct[0].productList)
            this.setState({productList: cartProduct.cartProduct[0].productList})
            this.setState({totalCartPrice: cartProduct.cartProduct[0].totalCartPrice})
        })
        .catch(()=>{
            console.log("error")
        })
        window.location.reload();
    }

    togglePopUp=()=>{
        console.log("inside toggle Popup function inside CartPage")
        console.log(this.state.isPopUp)
        this.setState({isPopUp:!this.state.isPopUp})

    }

    render() {
        let myButton;
        if(this.state.isSignedUp == false) {
            myButton = <button onClick={this.togglePopUp}>PROCEED TO CHECKOUT</button>
            // alert('Please Login')
        }
        else {
            myButton = <Link to="/checkout"><button>PROCEED TO CHECKOUT</button></Link>
        }
        console.log(this.state.isPopUp)
        console.log(this.state.isSignedUp)

        return(
            <div>
                <NavBar1/>
                <NavBar2/>
                {this.state.productList.length===0?
                    <div>
                        There are no products in the cart !
                    </div>
                :
                <div>
                    <div>
                        <h1>Total Price: Rs. {this.state.totalCartPrice}</h1>
                        {myButton}
                        <div className = "checkoutPagePopUp">{this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}</div>
                    </div>
                    
                    {(this.state.productList).map((eachProduct) => (
                        <div>
                            <div>
                                Title: {eachProduct.title},
                                Quantity: 
                                <button className="decreaseBtn" onClick={()=>this.decreaseClick(eachProduct.productId)}>-</button>
                                {eachProduct.cartQuantity} 
                                <button className="increaseBtn" onClick={()=>this.increaseClick(eachProduct.productId)}>+</button>
                                Price: Rs. {eachProduct.quantityPrice}
                                <button onClick={()=>this.removeClick(eachProduct.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div> 
                }
            <Footer/>
            </div>
        );
    }
}

export default CartPage;