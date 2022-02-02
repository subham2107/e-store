import React from "react";
import "./Banner.css"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './index.css';

function Banner() {
    return (
        <div className = "BannerClass">
            <AliceCarousel autoPlay activeIndex infinite disableButtonsControls autoPlayInterval="3000">
                <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/29/e216ef4e-e7fd-4d93-9170-eef453a5b5bb1643443407114-Casual-Wear_Desk.jpg" className="sliderimg" alt="Flash" />
                <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/29/444124dd-05bd-499d-a9b9-97419918c49e1643437121498-Valentine-s-Edit_Dk.jpg" className="sliderimg" alt="Flash" />
                <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/29/6180d242-b6c1-4c6e-8e71-ac3f6b7587341643443331590-Loafers---Sneakers_Desk.jpg" className="sliderimg" alt="Flash" />
                <img src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/1/29/04111d50-dd48-4397-aef7-37e72bc41add1643443635917-Handbags---Wallets_Desk.jpg" className="sliderimg" alt="Flash" />
            </AliceCarousel>
        </div>
    );
}

export default Banner;