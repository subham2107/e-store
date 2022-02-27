import React from 'react';
import './NavBar2.css';
import {Link} from 'react-router-dom';

class NavBar2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    
    render() {
        // const onCategoryClick = (category) => {
        //     return (
        //         window.location = `/product/category/${category}`
        //     )
        // };
        return (
            <div class = "NavBar2">
                {/* <div onClick = {()=> onCategoryClick('fashion')}>FASHION </div>
                <div onClick = {()=> onCategoryClick('electronics')}>ELECTRONICS</div>
                <div onClick = {()=> onCategoryClick('jewellery')}>JEWELLERY</div> */}
                <Link to={`/product/category/fashion`}>FASHION</Link>
                <Link to={`/product/category/electronics`}>ELECTRONICS</Link>
                <Link to={`/product/category/jewellery`}>JEWELLERY</Link>
            </div>
        );

    }
   
}

export default NavBar2;