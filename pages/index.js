import React from 'react'

import {Product, FooterBanner, HeroBanner} from '../components'

const Home = () => {
  return (
    <>
    Hero banner

    <div>
      <h2 className='products-heading'>Best selling Products</h2>
      <p>Speakers of many varitions</p>
    </div>

    <div className='products-container'>
      {['Product 1', 'Product 2'].map((product) => product)}
    </div>

    Footer
    </>
  )
}

export default Home