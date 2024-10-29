'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';
import { IProduct } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
  product: IProduct;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

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
        <ProductForm product={product} _onSubmit={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
