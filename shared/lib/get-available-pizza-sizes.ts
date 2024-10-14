import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "@/components/shared/group-variants";

export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType): Variant[] => {
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !(items.filter((item) => item.pizzaType === type)).some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
}