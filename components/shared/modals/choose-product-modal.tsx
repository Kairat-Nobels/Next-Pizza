'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { DialogTitle } from '@radix-ui/react-dialog';
import { IProduct } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
  product: IProduct;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      toast.success(`${product.name} добавлена в корзину`);
      handleClose();
    } catch (error) {
      toast.error(`Не удалось добавить ${product.name} в корзину`);
      console.error(error);
    }
  }
  useEffect(() => {
    if (window.location.pathname === `/product/${product.id}`) {
      setIsOpen(true);
      router.push(`/product/${product.id}`)
    } else {
      setIsOpen(false);
    }
  }, [product, router]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn(className, 'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
        <DialogTitle className='hidden' />
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            ingredients={product.ingredients}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
