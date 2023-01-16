import React from 'react';
import Product from '../../components';

import {client, urlFor} from '../../lib/client';

const ProductDetails = ({product, products}) => {
     const { image, name, details, price } = product;

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                  <img src={urlFor(image && image[0])} />
                </div>
                <div className='small-images-container'>
                  {image?.map((item, i) => {
                    <img 
                      src={urlFor(item)}
                      className=""
                      onMouseEnter=""
                    />
                  })}
                </div>
            </div>

        </div>
    </div>
  )
}
//required for paths in next js for headless cms
export const getStaticPaths = async () => {
  const query = `*[_type == product]{
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    },
    
  }, console.log(product, 'paths product')));
  
  return {
    paths,
    fallback: 'blocking',
  }
}


export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const product = await client.fetch(query);

    const productsQuery = `*[_type == "product"]`;
    const products = await client.fetch(productsQuery);
  
    console.log(product);
  
    return {
      props: {products, product}
    }
  }

export default ProductDetails