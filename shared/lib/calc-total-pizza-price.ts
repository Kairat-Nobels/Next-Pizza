import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
 * @param items - список вариаций
 * @param size - размер выбранной пиццы
 * @param type - тип выбранной пиццы
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns {number} общую стоимость.
 */
export const calcTotalPizzaPrice = (
  items: ProductItem[],
  type: number,
  size: number,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
}