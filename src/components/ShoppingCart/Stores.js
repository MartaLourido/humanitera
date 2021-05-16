import { writable, readable, derived } from "svelte/store";
import { PRODUCTS, VALID_COUPONS } from  "./Data/data";

export const productStore = readable([], async (set) => {
  set(
    await new Promise((resolve, _reject) => {
      resolve(PRODUCTS);
    })
  );

  return () => {};
});

export const validCouponStore = readable([], async (set) => {
  set(
    await new Promise((resolve, _reject) => {
      resolve(VALID_COUPONS);
    })
  );

  return () => {};
});

export const cartStore = (() => {
  const { subscribe, set, update } = writable({
    items: [],
    coupons: [],
    quantities: {},
    totalItems: 0,
  });

  const addItem = (newItem) => {
    update(({ items, coupons, quantities, totalItems }) => {
      if (quantities[newItem.id]) {
        return {
          items,
          coupons,
          quantities: {
            ...quantities,
            [newItem.id]: quantities[newItem.id] + 1,
          },
          totalItems: totalItems + 1,
        };
      } else {
        return {
          items: [...items, newItem],
          coupons,
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
    update(({ items, coupons, quantities, totalItems }) => {
      if (quantities[itemToRemove.id] > 1) {
        return {
          items,
          coupons,
          quantities: {
            ...quantities,
            [itemToRemove.id]: quantities[itemToRemove.id] - 1,
          },
          totalItems: totalItems - 1,
        };
      } else {
        return {
          items: items.filter((item) => item.id !== itemToRemove.id),
          coupons,
          quantities: {
            ...quantities,
            [itemToRemove.id]: 0,
          },
          totalItems: totalItems - 1,
        };
      }
    });
  };

  const addCoupon = (newCoupon) => {
    update(({ items, coupons, quantities, totalItems }) => {
      return {
        items,
        coupons: coupons.find((coupon) => coupon.code === newCoupon.code)
          ? coupons
          : [...coupons, newCoupon],
        quantities,
        totalItems,
      };
    });
  };

  const removeCoupon = (couponToRemove) => {
    update(({ items, coupons, quantities, totalItems }) => {
      const index = coupons.findIndex(
        (coupon) => coupon.code === couponToRemove.code
      );

      return {
        items,
        coupons:
          index > -1
            ? [...coupons.slice(0, index), ...coupons.slice(index + 1)]
            : coupons,
        quantities,
        totalItems,
      };
    });
  };

  return {
    subscribe,
    set,
    update,
    addItem,
    removeItem,
    addCoupon,
    removeCoupon,
  };
})();

export const costStore = derived(cartStore, ($cart) => {
  const subTotal = $cart.items
    .reduce((sum, item) => (sum += item.price * $cart.quantities[item.id]), 0)
    .toFixed(2);

  const discountAmount = $cart.coupons
    .reduce((sum, coupon) => {
      let discount = 0;

      switch (coupon.discountType) {
        case "SEK":
          discount = coupon.value;
          break;
        case "PERCENT_OFF":
          discount = subTotal * coupon.value;
          break;
        default:
          break;
      }

      sum += discount;

      return sum;
    }, 0)
    .toFixed(2);

  const total = (subTotal - discountAmount).toFixed(2);

  return {
    discountAmount,
    subTotal,
    total,
  };
});
