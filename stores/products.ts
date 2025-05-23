import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Product } from "@/types/product";

interface cartStoreInterface {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeItem: (id: string | number) => void;
}

const initialValue = {
  cart: [],
};

export const useProductStore = create<cartStoreInterface>()(
  persist(
    (set) => ({
      ...initialValue,
      addToCart: (data) =>
        set((state) => {
          if (state.cart.find((i) => i.id === data.id)) {
            const newCart = state.cart.map((i) => {
              if (i.id === data.id) {
                return { ...i, quantity: i.quantity + 1 };
              } else {
                return i;
              }
            });

            return {
              cart: newCart,
            };
          }

          return {
            cart: [...state.cart, { ...data, quantity: 1 }],
          };
        }),
      removeItem: (id) =>
        set((state) => {
          const current = state.cart.find((i) => i.id === id);

          if (current && current.quantity > 1) {
            const newCart = state.cart.map((i) => {
              if (i.id === id) {
                return { ...i, quantity: i.quantity - 1 };
              } else {
                return i;
              }
            });

            return {
              cart: newCart,
            };
          } else {
            const newCart = state.cart.filter((i) => i.id !== id);

            return {
              cart: newCart,
            };
          }
        }),
    }),
    {
      name: "cart", // Key used in localStorage
      storage: createJSONStorage(() => localStorage), // Storage type
    },
  ),
);
