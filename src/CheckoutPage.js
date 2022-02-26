import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import {initiatePayment} from './payment';

class CheckoutPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
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
        return(
            <div>
                <NavBar1/>
                <NavBar2/>
                <div>Checkout Page</div>
                <div className="LoginPage">
         <div className = 'loginHeader'>Enter Address</div>
         <div className = 'loginError'>
      {this.state.messageLogin? <span className ='error-span'>{this.state.messageLogin}</span> : null} 
      {this.state.messageSignup ? <span className ='error-span'>{this.state.messageSignup}</span> : null}
      </div>
        <form className = 'form-data'>
        <div >
          <div>
          <label className='cityName-label'>City <span className = 'star'>*</span></label>
          
          <input className='cityName-input' placeholder="Enter City" name="cityName" required type="text" onInput={this.onInput} value={this.state.cityName}></input>
        </div>
        <div>
          <label className='pincode-label'>Pincode <span className = 'star'>*</span></label>
          
          <input className='pincode-input' placeholder="Enter Pincode" name="pincode" required type="text" onInput={this.onInput} value={this.state.pincode}></input>
        </div>
        <div>
        <label className='stateName-label'>State<span className = 'star'>*</span></label>
          
          <input className='stateName-input' placeholder="Enter State" name="stateName" required type="text" onInput={this.onInput} value={this.state.stateName}></input>
        </div>
      </div>
          <div>
            <div>
             <input className='form-login-btn'  type="submit" onClick={this.onLoginClick} value="Submit"></input>
            </div>
           
          </div>
        </form>
      </div>
                <div>
                    <button type="submit" className="shippingformBtn" onClick={()=>this.placeOrderClick()}>Pay Now</button>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CheckoutPage;