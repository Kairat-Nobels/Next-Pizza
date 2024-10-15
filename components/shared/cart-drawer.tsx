'use client';

import React, { PropsWithChildren } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/shared/store';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemsDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
  const [totalAmount, fetchCartItems, updateItemQuantity, items] = useCartStore(state => [
    state.totalAmount,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.items,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={cn(className, 'flex flex-col justify-between pb-0 bg-[#F4F1EE]')}>
        <SheetHeader>
          <SheetTitle>В корзине <span className='font-bold'>{items.reduce((acc, item) => acc + item.quantity, 0)} товара</span></SheetTitle>
        </SheetHeader>

        <div className='-mx-6 mt-4 overflow-auto flex-1'>
          {
            items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                details={getCartItemsDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              />
            ))
          }
        </div>

        <SheetFooter className='-mx-6 bg-white p-8'>
          <div className='w-full'>
            <div className="flex mb-4">
              <span className='flex flex-1 text-lg text-neutral-500'>
                Итого
                <div className='flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2' />
              </span>

              <span>{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button
                type='submit'
                className='w-full h-12 text-base'
              >
                Оформить заказ
                <ArrowRight className='w-5 ml-2' />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};