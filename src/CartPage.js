import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import './CartPage.css';
import './PopUp.css';
import './LoginPage.css';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import PopUp from './PopUp';
import {initiatePayment} from './payment';



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

    placeOrderClick = () => {
        alert('Use this dummy card no: 5267318187975449 and any random cvv')
        const paymentHandlers = {
          onSuccess : (options) => {
            console.log("options")
            console.log(options)
            fetch(`/api/orders/${options.id}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(options)
            })
            .then(res => {
              if(res.status === 204){
                window.location = `/orders`
              }
            })
          },
          onDismiss: () => {
          }
        }
        const onOrderCreateFailure = (err) => {
        }
        initiatePayment(paymentHandlers, onOrderCreateFailure);
  }

    render() {
        let myButton;
        if(this.state.isSignedUp === false) {
            myButton = <button class="proceedToCheckoutBtn" onClick={this.togglePopUp}>PROCEED TO CHECKOUT</button>
        }
        else {
            myButton = <button type="submit" className="proceedToCheckoutBtn1" onClick={()=>this.placeOrderClick()}>PAY NOW</button>
        }
        console.log(this.state.isPopUp)
        console.log(this.state.isSignedUp)

        return(
            <div>
                <NavBar1/>
                <NavBar2/>
                <div className = "cartDiv">
                {this.state.productList.length===0?
                    <div className = "noProductsDiv">
                        There are no products in the cart !
                    </div>
                :
                <div>
                    <div>
                        <span>Total Price: Rs. {this.state.totalCartPrice}</span>
                        {myButton}
                        <div className = "checkoutPagePopUp">{this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}</div>
                    </div>
                    
                    {(this.state.productList).map((eachProduct) => (
                        <div>
                            <div>
                            <Link to={`/product/${(eachProduct.productId)}`}><img className="cartImage" src={eachProduct.image} alt={eachProduct.title} /></Link>
                                {eachProduct.title},
                                Quantity: 
                                {eachProduct.cartQuantity === 1? 
                                <button className="decreaseBtn" disabled={true} onClick={()=>this.decreaseClick(eachProduct.productId)}>-</button>
                                :
                                <button className="decreaseBtn" onClick={()=>this.decreaseClick(eachProduct.productId)}>-</button>
                                } 
                                <span className ="eachProductQuantity">{eachProduct.cartQuantity}</span>
                                <button className="increaseBtn" onClick={()=>this.increaseClick(eachProduct.productId)}>+</button>
                                Price: Rs. {eachProduct.quantityPrice}
                                <button class="removeBtn" onClick={()=>this.removeClick(eachProduct.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div> 
                }
                </div>
            <Footer/>
            </div>
        );
    }
}

export default CartPage;