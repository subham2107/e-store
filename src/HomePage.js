import React from 'react';
import NavBar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';

 class HomePage extends React.Component {
     constructor(props) {
         super(props);
         this.state = {

         };
     }

     render() {
         return (
             <div>
                 <NavBar/>
                 <Banner/>
                 <Footer/>
             </div>
         );
     }
 }


export default HomePage;