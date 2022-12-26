import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';

const ProductDetails = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  console.log(slug);
  const product = data.products.find((x) => x.slug == slug);
  if (!product) {
    return <div>Product Not found</div>;
  }

  const addToCartHandler = () => {
    const exisItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = exisItem ? exisItem.quantity + 1 : 1;
    if (product.countInStock <= quantity) {
      alert('Sorry.Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div>
        <Link href={'/'}>Go back</Link>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              className="object-contain w-[400px] h-[400px]"
            />
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Category {product.category}</li>
              <li>Brand:{product.brand}</li>
              <li>
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description:{product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5 border">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  ${product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
              <button
                onClick={addToCartHandler}
                className="btn btn-primary w-full"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
