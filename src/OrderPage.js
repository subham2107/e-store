import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import './OrderPage.css';
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
            console.log(response)
            this.setState({orders: response.reverse().filter((x)=>x.status === 'COMPLETED')})
            //this.setState({orders:response})
            console.log(this.state.orders)
        })
    }

    render() {
        return(
            <div>
                <NavBar1/>
                <NavBar2/>
                <h1>Orders</h1>
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
                    Total: Rs. {eachOrder.amount/100}, 
                    Ordered on: {new Date(eachOrder.createdAt).toDateString()}
                    <hr></hr>
                    </div>
                    
                ))}
                <Footer/>
            </div>
        );
    }
}

export default OrderPage;