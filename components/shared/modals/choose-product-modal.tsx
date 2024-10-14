'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { DialogTitle } from '@radix-ui/react-dialog';
import { IProduct } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
  product: IProduct;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  useEffect(() => {
    setIsOpen(Boolean(product));
  }, [product]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn(className, 'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
        <DialogTitle className='hidden' />
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients} />)
          : (
            <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
          )}

      </DialogContent>
    </Dialog>
  );
};
