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
            if (user.status === 200) {
              this.setState({isSignedUp: true});
              
            }
            else {
              this.setState({isSignedUp: false});
              
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
            
            
        })
        
          
    }
      

    decreaseClick(productId) {
        
        fetch(`/api/cart/${productId}/decreaseCount`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res =>res.json())
        .then(cartProduct=>{
            
            this.setState({productList: cartProduct.cartProduct[0].productList})
            this.setState({totalCartPrice: cartProduct.cartProduct[0].totalCartPrice})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    increaseClick(productId) {
       
        fetch(`/api/cart/${productId}/increaseCount`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res =>res.json())
        .then(cartProduct=>{
            
            this.setState({productList: cartProduct.cartProduct[0].productList})
            this.setState({totalCartPrice: cartProduct.cartProduct[0].totalCartPrice})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    removeClick(productId) {
        
        fetch(`/api/cart/${productId}`, {
            method: 'DELETE'
        })
        .then(res =>res.json())
        .then(cartProduct=>{
            
            this.setState({productList: cartProduct.cartProduct[0].productList})
            this.setState({totalCartPrice: cartProduct.cartProduct[0].totalCartPrice})

        })
        .catch(()=>{
            console.log("error")
        })
        window.location.reload();

    }

    togglePopUp=()=>{
        
        this.setState({isPopUp:!this.state.isPopUp})

    }

    placeOrderClick = () => {
        //alert('Use this Razorpay test card no: 5267318187975449 and any random CVV and card-expiry date for dummy payment.')
        alert(`For test payments select UPI/QR method and enter UPI ID as "success@razorpay"`)
        const paymentHandlers = {
          onSuccess : (options) => {
            
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
                    <div className='headerBtns'>
                        <h1>Total Price: Rs. {this.state.totalCartPrice}</h1>
                        {myButton}
                        <div className = "checkoutPagePopUp">{this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}</div>
                    </div>
                    
                    {(this.state.productList).map((eachProduct) => (
                        <div>
                            <div className='eachCartDiv'>
                            <div class="cartImageIncreaseDecreseDiv">
                            <div>
                            <Link to={`/product/${(eachProduct.productId)}`}>
                                <img className="cartImage" src={eachProduct.image} alt={eachProduct.title} />
                            </Link>
                            </div>
                            <div className='increaseDecreaseBtns'>
                            {eachProduct.cartQuantity === 1? 
                                <button className="decreaseBtn" disabled={true} onClick={()=>this.decreaseClick(eachProduct.productId)}>-</button>
                                :
                                <button className="decreaseBtn" onClick={()=>this.decreaseClick(eachProduct.productId)}>-</button>
                                } 
                                
                                <span className ="eachProductQuantity">{eachProduct.cartQuantity}</span>

                                <button className="increaseBtn" onClick={()=>this.increaseClick(eachProduct.productId)}>+</button>

                            </div>
                            </div>
                            <div>
                            {eachProduct.title } 
                            <br></br><br></br>
                            Price: Rs. {eachProduct.quantityPrice}
                            <br></br><br></br>
                            <button class="removeBtn" onClick={()=>this.removeClick(eachProduct.productId)}>Remove</button>
                            </div>
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