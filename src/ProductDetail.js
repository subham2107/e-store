import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import './ProductDetail.css';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: {}};
    }

    componentDidMount() {
        fetch(`/api/products/${this.props.match.params.productId}`)
        .then(res=>res.json())
        .then(response => {
            console.log((response[0]))
            this.setState({product: response[0]})
            console.log(this.state.product)
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
                <button className="addToCartBtn">Add to Cart</button>
                <Footer/>
                
            </div>
        );
    }
}

export default ProductDetail;