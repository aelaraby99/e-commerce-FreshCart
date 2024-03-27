import React from 'react'
import { Grid } from 'react-loader-spinner';

export default function GridSpinner() {
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
    <Grid
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="grid-wrapper"
    />


  </div> 
  )
}
