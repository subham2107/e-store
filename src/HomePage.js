import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
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
                 <NavBar1/>
                 <NavBar2/>
                 <Banner/>
                 <Footer/>
             </div>
         );
     }
 }


export default HomePage;