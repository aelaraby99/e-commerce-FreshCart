import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import GridSpinner from '../Spinner/GridSpinner';


export default function CategorySlider() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { isFetching, isLoading, data } = useQuery('categorySlider', getAllCategories, {
        refetchOnMount: false, // refetch data on mount
        refetchOnWindowFocus: false, // refetch data when window is focused
    });
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        swipeToSlide: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };
    return (
        <>
            <div className='row shadow-lg text-center my-5'>
                {isLoading || isFetching ?
                    <div className='d-flex align-items-center' style={{ maxHeight: "200px" }} >
                        <GridSpinner />
                    </div>
                    :
                    <div>
                        <Slider {...settings}>
                            {data?.data.data.map((category, idx) =>
                                <div key={idx}>
                                    <img className='w-100 mb-2' style={{ height: "300px" }} src={category.image} alt="Slider" />
                                    <p className='fs-6 pt-1'>{category.name} </p>
                                </div>
                            )}
                        </Slider>
                    </div>}
            </div>
        </>
    )
}
