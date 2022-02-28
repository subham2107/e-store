import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import './OrderPage.css';
import './CartPage.css';
import {Link} from 'react-router-dom';

class OrderPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        fetch(`/api/orders`)
        .then(res=>res.json())
        .then(response => {
            
            this.setState({orders: response.reverse().filter((x)=>x.status === 'COMPLETED')})
            
        })
    }

    render() {
        return(
            <div>
                <NavBar1/>
                <NavBar2/>
                <div className="orderDiv">
                {this.state.orders.length===0?
                    <div className = "noProductsDiv">
                        You have not ordered yet !
                    </div>
                :<div>
                <h1 style={{textAlign: 'center'}}>My orders</h1>
                {this.state.orders.map((eachOrder)=>(
                    <div>
                    {eachOrder.productList.map((eachProduct)=>(
                        <div>
                            <Link to={`/product/${(eachProduct.productId)}`}><img className = "orderProductImage" src = {eachProduct.image} alt ="img"></img></Link>
                              {eachProduct.title}, 
                              Quantity: {eachProduct.cartQuantity},
                              Subtotal: Rs. {eachProduct.quantityPrice}
                        </div>
                    ))}
                    <div className='amountOrderDateDiv'>
                    <span>Total: Rs. {eachOrder.amount/100}, 
                    Ordered on: {new Date(eachOrder.createdAt).toDateString()}
                    </span>
                    </div>
                    <hr></hr>
                    </div>
                    
                ))}
                </div>}
                </div>
                <Footer/>
                
            </div>
        );
    }
}

export default OrderPage;