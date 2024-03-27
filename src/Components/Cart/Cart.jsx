import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Contexts/Cart';
import GridSpinner from '../Spinner/GridSpinner';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function Cart() {

  const { cartProducts, cartTotalPrice, deleteCartItem, updateCartItem, getCart } = useContext(CartContext);
  useEffect(() => {
    getCart();
  })

  async function handleUpdateItem(itemId, itemCount) {
    if (itemCount >= 1) {
      await updateCartItem(itemId, itemCount).then((res) => {
        if (res.status === "success") {
          toast.success("Product Updated")
        }
      });
    }
  }
  async function handleDeleteItem(itemId) {
    await deleteCartItem(itemId).then((res) => {
      if (res?.data.status === "success") {
        toast.success("Product Deleted")
      }
    });
  }

  return (
    <>
      <Helmet >
        <title>Cart</title>
      </Helmet>
      {cartProducts === null ? <GridSpinner /> : <div style={{ backgroundColor: "#dededeff" }} className="container py-2">
        <h2>Shop Cart</h2>
        <h5 className='main-color'>Total Price: {cartTotalPrice} EGP</h5>
        {cartProducts.map((product) =>
          <div key={product._id} className="row border border-top-0 border-end-0 border-start-0 p-2 align-items-center mb-1">
            <div className="col-md-3">
              <img className='w-50' style={{ maxHeight: "200px" }} src={product.product.imageCover} alt="Product" />
            </div>
            <div className="col-md-6 offset-md-1">
              <h3>{product.product.title}</h3>
              <h4 className="main-color">Price: {product.price} EGP</h4>
              <h5 className='fs-5'> {product.product.ratingsAverage} <i className='fa fa-star text-warning'></i> </h5>
              <button className="btn ps-0" onClick={() => handleDeleteItem(product.product._id)}><i className='fa fa-trash-can main-color'></i> Remove</button>
            </div>
            <div className="col-md-2 align-self-baseline">
              <div className='d-flex align-items-center justify-content-center'>
                <button onClick={() => { handleUpdateItem(product.product._id, product.count + 1) }} className='btn fa-regular fa-square-plus fs-5 main-color ms-2'></button>
                <h3>{product.count}</h3>
                <button onClick={() => { handleUpdateItem(product.product._id, product.count - 1) }} className='btn fa-regular fa-square-minus fs-5 me-2 main-color'> </button>
              </div>
            </div>
            <hr className='mt-2' />
          </div>
        )}
      </div>}
    </>
  )
}
