import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Contexts/Cart';
import { addCartHandler } from '../../Helpers/addToCatrHandlerFunc';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

    const {addToCart} = useContext(CartContext)
    const { id } = useParams();

    async function getProductDetails(productId) {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    }

    let { data, isLoading, isRefetching } = useQuery('productDetails', () => getProductDetails(id), {
        refetchOnWindowFocus: false,
    });

    return (
        <div className='container'>
              <Helmet >
                <title> Product Details | FreshCart</title>
            </Helmet>
            {isLoading || isRefetching ? <h1>Loading...</h1> :
                <div className="row justify-content-around align-items-center py-5">
                    <div className="col-md-3 offset-md-1 py-5">
                        <img className='w-100' src={data?.data.data.imageCover} alt={`${data?.data.data.title}`} />
                    </div>
                    <div className="col-md-7 py-5">
                        <div>
                            <h1 className='h3 main-color'>{data?.data.data.title}</h1>
                            <h5 className='text-muted'>{data?.data.data.category.name}</h5>
                            <p className='text-muted'>{data?.data.data.description}</p>
                            <h5 className=''>Price: {data?.data.data.price} EGP</h5>
                            <h6 className=''>{data?.data.data.ratingsAverage} <span><i className='fa fa-star text-warning'></i></span> </h6>
                            <button onClick={()=> addCartHandler(addToCart,id)} className='fs-3 btn btn-sm main-color btn-outline-success mt-4 w-100'> <i className='fa fa-cart-plus'></i> Add To Cart</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
