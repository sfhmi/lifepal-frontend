import { CartProductInterface, Product } from '@/types/product'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


interface cartStoreInterface {
  cart: CartProductInterface[]
  addToCart: (item: Product) => void;
  removeItem: (id: string | number) => void;
}

const initialValue: {
  cart: CartProductInterface[]
} = {
  cart: [],
};

export const useProductStore = create<cartStoreInterface>()(
  persist(
    (set) => ({
      ...initialValue,

      addToCart: (data) => set((state) => {
        const item = {
          id: data.id,
          image: data.images[0],
          title: data.title,
          quantity: 1,
          price: data.price,
        }
        if (state.cart.find((i) => i.id === item.id)) {
          const newCart = state.cart.map((i) => {
            if (i.id === item.id) {
              return { ...i, quantity: i.quantity + 1 }
            } else {
              return i
            }
          })
          return ({
            cart: newCart
          })
        }
        return ({
          cart: [...state.cart, item]
        })
      }),
      removeItem: (id) => set((state) => {
        const current = state.cart.find((i) => i.id === id)
        if (current && current.quantity > 1) {
          const newCart = state.cart.map((i) => {
            if (i.id === id) {
              return { ...i, quantity: i.quantity - 1 }
            } else {
              return i
            }
          })
          return ({
            cart: newCart
          })
        } else {
          const newCart = state.cart.filter((i) => i.id !== id)
          return ({
            cart: newCart
          })
        }
      }),
    }),
    {
      name: "cart", // Key used in localStorage
      storage: createJSONStorage(() => localStorage), // Storage type
    },
  ),
)