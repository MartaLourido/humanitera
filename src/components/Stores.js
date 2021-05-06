import { writable, readable, derived } from "svelte/store";
import { PRODUCTS } from "../services/data/data";

export const productStore = readable([], async (set) => {
  set(
    await new Promise((resolve, _reject) => {
      resolve(PRODUCTS);
    })
  );

  return () => {};
});

export const cartStore = (() => {
  const { subscribe, set, update } = writable({
    items: [],
    quantities: {},
    totalItems: 0,
  });

  const addItem = (newItem) => {
    update(({ items, quantities, totalItems }) => {
      if (quantities[newItem.id]) {
        return {
          items,
          quantities: {
            ...quantities,
            [newItem.id]: quantities[newItem.id] + 1,
          },
          totalItems: totalItems + 1,
        };
      } else {
        return {
          items: [...items, newItem],
          quantities: {
            ...quantities,
            [newItem.id]: 1,
          },
          totalItems: totalItems + 1,
        };
      }
    });
  };

  const removeItem = (itemToRemove) => {
    update(({ items, quantities, totalItems }) => {
      if (quantities[itemToRemove.id] > 1) {
        return {
          items,
          quantities: {
            ...quantities,
            [itemToRemove.id]: quantities[itemToRemove.id] - 1,
          },
          totalItems: totalItems - 1,
        };
      } else {
        return {
          items: items.filter((item) => item.id !== itemToRemove.id),
          quantities: {
            ...quantities,
            [itemToRemove.id]: 0,
          },
          totalItems: totalItems - 1,
        };
      }
    });
  };

  return { subscribe, set, update, addItem, removeItem };
})();

export const costStore = derived(cartStore, ($cart) => {
  const subTotal = $cart.items
    .reduce((sum, item) => (sum += item.price * $cart.quantities[item.id]), 0)
    .toFixed(2);

  return {
    subTotal,
    total,
  };
});
