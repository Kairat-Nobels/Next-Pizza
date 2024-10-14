'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = React.useRef(null);

  const onItemClick = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  }

  useClickAway(ref, () => {
    setFocused(false);
  })

  useDebounce(() => {
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    }
    Api.products.search(searchQuery).then(items => setProducts(items))
  }, 200, [searchQuery]);

  return (
    <>
      {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'></div>}
      <div ref={ref} className={cn(className, 'flex rounded-2xl flex-1 justify-between relative h-11 z-30')}>
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input
          className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
          type='text'
          placeholder='Найти пиццу...'
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products?.length > 0 && <div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', focused && 'visible opacity-100 top-12')}>
          {
            products.map((p) => <Link
              key={p.id}
              onClick={onItemClick}
              href={`/product/${p.id}`}
              className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'>
              <img src={p.imageUrl} alt="пицца" className='rounded-sm h-8 w-8' />
              <span>{p.name}</span>
            </Link>
            )}
        </div>}
      </div>
    </>
  );
};