import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
    };
    return (
        <>
            <div className='row gx-0 my-5 shadow-lg'>
                <Slider {...settings}>
                    <div>
                        <img className='w-100' style={{height:"400px"}} src={require("../../Assets/images/slider-image-1.jpeg")} alt="Slider" />
                    </div>
                    <div>
                    <img className='w-100' style={{height:"400px"}} src={require("../../Assets/images/slider-image-2.jpeg")} alt="Slider" />
                    </div>
                    <div>
                    <img className='w-100' style={{height:"400px"}} src={require("../../Assets/images/slider-2.jpeg")} alt="Slider" />
                    </div>
                </Slider>
            </div>
        </>
    )
}
