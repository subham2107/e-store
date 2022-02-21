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
        alert('Use this card no: 5267318187975449')
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
                <div>
                    <button type="submit" className="shippingformBtn" onClick={()=>this.placeOrderClick()}>Pay Now</button>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CheckoutPage;