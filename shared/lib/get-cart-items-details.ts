import { mapPizzaTypes, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemsDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: CartStateItem['ingredients'],
) => {
  const details = [];
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaTypes[pizzaType];
    details.push(`${typeName} пицца ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
}