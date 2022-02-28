import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Banner from './Banner';
import Footer from './Footer';
import './NavBar1.css';
import './NavBar2.css';
import './index.css';
import './HomePage.css';
import {Link} from 'react-router-dom';

 class HomePage extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
            products: []
         };
     }
     componentDidMount() {
        fetch(`/api/products`)
        .then(res=> res.json())
        .then(response=>{
            this.setState({products: response.filter((x)=> x.price<=500)});
        })

    };

     render() {
         return (
             <div>
                 <NavBar1/>
                 <NavBar2/>
                 <Banner/>
                <h1 className='homePageProductHeader'>Check out our products</h1>
                 <div className="productListProducts">
                {(this.state.products)
                .map((eachProduct) =>(
                    <Link  to={`/product/${(eachProduct._id)}`}>
                    <div className="eachProductDiv">
                    <div>
                    <img className="poster" src={eachProduct.image} alt={eachProduct.title} />
                    <h4>{(eachProduct.title)}</h4>
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


export default HomePage;