import Head from 'next/head';
import Layout from '../components/Layout';
import data from '../utils/data';
import ProductItem from '../components/ProductItem';

export default function Home() {
  return (
    <Layout title="Home page">
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}
