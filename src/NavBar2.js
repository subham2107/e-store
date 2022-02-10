import React from 'react';
import './NavBar2.css';

class NavBar2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    
    render() {
        const onCategoryClick = (category) => {
            return (
                window.location = `/product/category/${category}`
            )
        };
        return (
            <div class = "NavBar2">
                <div onClick = {()=> onCategoryClick('fashion')}>FASHION </div>
                <div onClick = {()=> onCategoryClick('electronics')}>ELECTRONICS</div>
                <div onClick = {()=> onCategoryClick('jewellery')}>JEWELLERY</div>
            </div>
        );

    }
   
}

export default NavBar2;