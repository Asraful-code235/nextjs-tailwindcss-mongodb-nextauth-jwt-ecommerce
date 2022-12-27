import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="card p-5 border w-60  ">
      <Link href={`/product/${product.slug}`}>
        <Image
          width={190}
          height={300}
          src={product.image}
          alt={product.name}
          className="rounded h-[200px] object-cover object-center "
        />
      </Link>
      <div className="flex  flex-col items-start  justify-start p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="mb-1 text-lg text-slate-600 font-bold">
            {product.name}
          </h2>
        </Link>
        <p className="text-slate-400 text-sm font-semibold ">{product.brand}</p>
        <p className="text-slate-400 text-sm font-semibold mb-4 ">
          ${product.price}
        </p>
        <div className="flex items-center justify-end w-full">
          {/* <button
            onClick={() => addToCartHandler(product)}
            className="btn btn-success text-white   "
          >
            Add to cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
