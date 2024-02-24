import React from 'react';
import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from 'components/grid/tile';

export default async function Produtos() {
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  return (
    <div className="flex flex-col gap-8 p-4  ">
      <h1 className="text-4xl">Produtos</h1>
      <ul className="flex flex-col gap-4 ">
        {products.map((product, i) => (
          <li key={`${product.handle}${i}`} className="relative aspect-square flex-none ">
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
