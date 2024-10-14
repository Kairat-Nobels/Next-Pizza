import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { Title } from './title';
import { ProductImage } from './product-image';
import { GroupVariants } from './group-variants';
import { mapPizzaTypes, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient } from './ingredient';
import { ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  className?: string;
  name: string;
  imageUrl: string;
  ingredients: any[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, name, imageUrl, ingredients, items, onClickAddCart }) => {
  const { type, size, selectedIngredients, availableSizes, setSize, setType, addIngredient } = usePizzaOptions(items);

  const totalPrice = calcTotalPizzaPrice(items, type, size, ingredients, selectedIngredients);


  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400'>{size} см, {mapPizzaTypes[type]} пицца</p>
        <div className='flex flex-col gap-2 mt-2'>
          <GroupVariants
            items={availableSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='bg-gray-50 p-3 rounded-md h-[375px] overflow-auto scrollbar mt-4'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button onClick={onClickAddCart} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-5'>Добавить в корзину за {totalPrice} сом</Button>
      </div>
    </div>
  );
};