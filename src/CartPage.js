import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import './CartPage.css';

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: [],
            totalCartPrice: ''
        };
    }

    componentDidMount() {
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

    render() {
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
                        <button>Proceed to checkout</button>
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
               
            </div>
        );
    }
}

export default CartPage;