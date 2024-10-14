import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  className?: string;
  name: string;
  imageUrl: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({ className, name, imageUrl, onClickAdd }) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]' />
      </div>
      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse saepe aut rem, sed voluptas facilis repellat dolore omnis hic facere.</p>

        <Button onClick={onClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>Добавить в корзину за 350 сом</Button>
      </div>
    </div>
  );
};