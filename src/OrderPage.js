import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import Footer from './Footer';

class OrderPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <div>
                <NavBar1/>
                <NavBar2/>
                <div>Order Page</div>
                
                <Footer/>
            </div>
        );
    }
}

export default OrderPage;