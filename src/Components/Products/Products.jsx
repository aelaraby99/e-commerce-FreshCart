import { useQuery } from 'react-query';
import axios from 'axios';
import GridSpinner from "./../Spinner/GridSpinner";
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Contexts/Cart';
import {addCartHandler} from '../../Helpers/addToCatrHandlerFunc';
import { Helmet } from 'react-helmet';

export default function Products() {

  const {addToCart} = useContext(CartContext)
  async function getProducts() {

    return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  let { isLoading, isFetching, data } = useQuery('allProducts', getProducts, {
    refetchOnWindowFocus: false, // refetch data when window is focused 
    refetchOnMount: false, // refetch data on mount 
    refetchIntervalInBackground: false, // Refetch the data every interval (ms) in the background
    // refetchInterval: false, // Refetch the data every interval (ms)

    //cacheTime: 2000, // if data is older than 2 seconds, refetch it

    //enabled: true, // if false query will not execute ()=> refetch will make it true 

    //staleTime: 2000, // if data is older than 2 seconds, refetch it
    //refetchOnReconnect: false, // refetch data when a WebSocket reconnects 
    //retry: 5, // retry failed requests
  });

  return (
    <div className='container-fluid gx-0'>
        <Helmet >
                <title> Products | FreshCart</title>
            </Helmet>
      {isLoading || isFetching ? <GridSpinner /> :
        <div className='container'>
          <div className="row">
            <CategorySlider />
            {data?.data.data.map((product) =>
              <div key={product.id} className="col-sm-6 col-md-3 col-lg-2 p-2">
                <Link to={`/productdetails/${product.id}`}>
                  <div className='product text-start'>
                    <img className='w-100' src={product.imageCover} alt="Product" />
                    <h3 className='h6 main-color'>{product.category.name}</h3>
                    <span className='font-sm fw-bolder text-dark'>{product.title.split(" ").slice(0, 2).join(" ")}</span>,
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className='text-dark'>{product.price} EGP</span>
                      <span><i className='fas fa-star text-warning'></i> {product.ratingsAverage}</span>
                    </div>
                  </div>
                </Link>
                <div className='d-flex justify-content-center align-items-center pt-3'>
                  <button onClick={()=>addCartHandler(addToCart,product.id)}  className='btn btn-sm btn-outline-success w-100'><i className='fa fa-cart-plus'></i> Add To Cart</button>
                </div>
              </div>
            )}
          </div>
        </div>}
    </div>
  )
}
