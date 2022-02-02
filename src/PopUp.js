import React from "react";
import './PopUp.css';
import './LoginPage.css';
import LoginPage from './LoginPage';

class PopUp extends React.Component {

  handleClick = () => {
    this.props.togglePopUp();
  }

render() {
    return(
      
        <div className="popup">
            <div className="popup-inner">
                <div className = "popupLogo">
                <div className="companyLogo1"><b className="logoY">E</b><b>-Store</b></div>
                <button className="close-button" onClick={this.handleClick}><b>X</b></button>
                </div>
                <hr></hr>
                <LoginPage />          
            </div>
        </div>
        
    )
}
};
export default PopUp;