import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import './ProductDetail.css';
import {Link} from 'react-router-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: {}};
    }

    componentDidMount() {
        fetch(`/api/products/${this.props.match.params.productId}`)
        .then(res=>res.json())
        .then(response => {
            this.setState({product: response[0]})
        })
    }

    addToCart=()=> {
        
        fetch(`/api/cart/${this.state.product._id}`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res => {
            console.log("inside addToCartComponent")
            console.log(res)
        })
        .catch(()=>{
            console.log("error")
        })

    }
    

    render() {
        //console.log('hi'+ {(this.state.product.price)})

        return (
            <div>
                <NavBar1/>
                <NavBar2/>
                <h3>Title: {(this.state.product.title)}</h3>
                <img className = "productDetailImage" alt = "img" src={(this.state.product.image)}/>
                <h4>Description: {(this.state.product.description)}</h4>
                <button className="addToCartBtn" onClick={this.addToCart}>Add to Cart</button>
                <br></br>
                <Link to="/cart"><button className="goToCartBtn">Go to Cart</button></Link>
                <Footer/>
                
            </div>
        );
    }
}

export default ProductDetail;