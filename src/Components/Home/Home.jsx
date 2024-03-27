import React from 'react'
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategorySlider from "./../CategorySlider/CategorySlider";
import { Helmet } from 'react-helmet';

export default function Home() {
    return (
        <div className='container py-5'>
            <Helmet >
                <title> Home | FreshCart</title>
            </Helmet>
            <HomeSlider />
            <CategorySlider />
        </div>
    )
}
