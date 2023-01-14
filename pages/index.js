import React from 'react'
import {client} from '../lib/client';
import {Product, FooterBanner, HeroBanner} from '../components'
import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from 'next/dist/shared/lib/constants';

const Home = ({products, bannerData}) => {
  return (
    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    {console.log(bannerData)}

    <div>
      <h2 className='products-heading'>Best selling Products</h2>
      <p>Speakers of many varitions</p>
    </div>

    <div className='products-container'>
      {products?.map((product) => <Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}


/* 
nextjs specific required call
key note for react js
react would useEffect to pull from api using either fetch or axios
*/
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home