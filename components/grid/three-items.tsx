import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.

  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto p-4 ">
      <div className="flex flex-col rounded-xl border  ">
        <div className="grid max-w-screen-2xl  gap-4  px-4 pb-2 pt-4   md:grid-cols-6 md:grid-rows-2   ">
          <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
          <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
          <ThreeItemGridItem size="half" item={thirdProduct} />
        </div>
        <Link href="/produtos" className="flex w-full items-center justify-end  px-4 pb-2">
          <p className="text-xs">ver todos </p>
          <ChevronRightIcon className="h-4" />
        </Link>
      </div>
    </section>
  );
}
