import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const router = useRouter();
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Produt Not Found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return ( <Layout title={product.name}>
    
    <div className="grid md:grid-cols-3 md:gap-4 space-x-10">
      <div className="md:col-span-2 ">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          />
        </div>
        
        <div className="text-lg m-3">
          <ul>
            <li>
              <h1 className="text-2xl">{product.name}</h1>
            </li>
            <li> Category: {product.category} </li>
            <li> Rating: {product.rating} </li>
            <li>< h1 className="text-justify"> Description: {product.description}</h1></li>
          </ul>
        </div>
      </div>
    
    <div>        
      <div className="card max-w-xs  flex p-5 bg-white  m-8 ">
        <div className="mb-5 flex justify-between">
          <div>Price</div>
            <div>${product.price}</div>
        </div>
        <div className="mb-2 flex justify-between">
          <div>Status</div>
            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
        </div>
        <button className="primary-button w-full"
                onClick={addToCartHandler} >
                  Add to cart
        </button>
      </div>
    </div>
        
        <div className="py-2">
          <Link href="/"> Back </Link>
        </div>
      </Layout>
    );
  }