import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import './ProductList.css';
import Footer from './Footer';
import {Link} from 'react-router-dom';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        fetch(`/api/products/category/${this.props.match.params.categoryName}`)
        .then(res=> res.json())
        .then(response=>{
            this.setState({products: response});
        })

    };

    render() {
        return (
            <div className='productListDiv'>
            <NavBar1/>
            <NavBar2/>
            <h1 className = "productListHeader">DEALS OF THE DAY</h1>
            <div className="productListProducts">
                
                {(this.state.products)
                .map((eachProduct) =>(
                    <Link  to={`/product/${(eachProduct._id)}`}>
                    <div className="eachProductDiv">
                    <div>
                    <img className="poster" src={eachProduct.image} alt={eachProduct.title} />
                    <h4>{(eachProduct.title)}</h4>
                    <h5>Price: Rs. {eachProduct.price}</h5>
                    <h5>Rating: <span className="productRating">{(eachProduct.rating.rate)} <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="white" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg></span></h5>
                    <h5>Rate Count: {(eachProduct.rating.count)}</h5>
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

export default ProductList;