'use client';

import { IProduct } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { cn } from '@/shared/lib/utils';

interface Props {
  product: IProduct;
  _onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, _onSubmit, className }) => {
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      toast.success(`${product.name} добавлена в корзину`);
      _onSubmit?.();
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`);
      console.error(error);
    }
  }

  if (isPizzaForm) return (
    <ChoosePizzaForm
      className={cn(!_onSubmit && 'rounded-lg')}
      imageUrl={product.imageUrl}
      name={product.name}
      items={product.items}
      ingredients={product.ingredients}
      onSubmit={onSubmit}
      loading={loading}
    />
  );

  return (
    <ChooseProductForm
      className={cn(!_onSubmit && 'rounded-lg')}
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};