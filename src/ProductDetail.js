import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';
import './ProductDetail.css';
import {Link} from 'react-router-dom';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: {}, cartProductCount: '', similarProducts: []};
    }

    componentDidMount() {
        
        fetch(`/api/products/${this.props.match.params.productId}`)
        .then(res=>res.json())
        .then(response => {
            this.setState({product: response[0]})
            console.log("called first")
            console.log(this.state.product)
            // mycategory = this.state.product.category
            // console.log(mycategory)
        })

        
        

        
    }

    componentDidUpdate(prevProps) {
        // console.log("hi")
        // console.log(this.props)
        // console.log(prevProps.location.pathname)
        if(this.props.location.pathname !== prevProps.location.pathname) {
            fetch(`/api/products/${this.props.match.params.productId}`)
            .then(res=>res.json())
            .then(response => {
                this.setState({product: response[0]})
                console.log("called first")
                console.log(this.state.product)
                // mycategory = this.state.product.category
                // console.log(mycategory)
            })
        }
        fetch(`/api/products/category/${this.state.product.category}`)
        .then(res => res.json())
        .then(data => {
            // if(this.props.location.pathname !== prevProps.location.pathname) {
                this.setState({similarProducts: data.filter(x => x._id.toString() !== this.props.match.params.productId)})

            // }

        })
    }

    addToCart=()=> {
        
        fetch(`/api/cart/${this.props.match.params.productId}`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res => {
            console.log("inside addToCartComponent")
            console.log(res)
            fetch('/api/cart/count')
            .then(response => response.json())
            .then(cartProductCount => {
            console.log(cartProductCount.cartProductCount)
            this.setState({cartProductCount: cartProductCount.cartProductCount})
            })
            .catch((e)=>{
            console.log(e)
            })
        })
        .catch((e)=>{
            console.log(e)
        })

        

    }

    // similarProductClick = (prevProps) => {
    //     console.log(prevProps)
    //     fetch(`/api/products/category/${this.state.product.category}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         // if(this.props.location.pathname !== prevProps.location.pathname) {
    //             this.setState({similarProducts: data.filter(x => x._id.toString() !== this.props.match.params.productId)})

    //         // }

    //     })
    // }
    

    render() {
        //console.log('hi'+ {(this.state.product.price)})
        console.log(this.state.similarProducts)
        console.log(this.prevProps)
        console.log(this.props.match.params.productId)

        return (
            <div>
                <NavBar1 cartProductCount={this.state.cartProductCount}/>
                <NavBar2/>
                <h3>Title: {(this.state.product.title)}</h3>
                <img className = "productDetailImage" alt = "img" src={(this.state.product.image)}/>
                <h4>Description: {(this.state.product.description)}</h4>
                <button className="addToCartBtn" onClick={this.addToCart}>Add to Cart</button>
                <br></br>
                <Link to="/cart"><button className="goToCartBtn">Go to Cart</button></Link>
                {/* <button className="addToCartBtn" onClick={this.similarProductClick}>Similar Products</button> */}
                <h3>You may also like</h3>
                <div className="productListProducts">
                {this.state.similarProducts.map((eachProduct) => (
                     
                        <Link  to={`/product/${(eachProduct._id)}`}>
                        <div className="eachProductDiv">
                        <div>
                        <img className="poster" src={eachProduct.image} alt={eachProduct.title} />
                        <h4>{(eachProduct.title)}</h4>
                        {/* <h5>Price: Rs. {eachProduct.price}</h5>
                        <h5>Rating: <span className="productRating">{(eachProduct.rating.rate)} <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg></span></h5>
                        <h5>Rate Count: {(eachProduct.rating.count)}</h5> */}
                        </div>
                        </div>
                        </Link>
                   
                ))}
                
                </div>
                
                <Footer/>
                
            </div>
        );
    }
}

export default ProductDetail;