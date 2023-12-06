import { CartProductType } from "@/app/products/[productid]/ProductDetails";
import { create } from "zustand";
import { persistNSync } from "persist-and-sync";
import {toast} from "react-hot-toast"

interface CartType {
    cartTotalQty: number;
    cartProducts: CartProductType[];
    handleAddProductToCart: (product: CartProductType) => void;
  };
  

const INITIAL_STATE = {
  cartProducts: [],
  cartTotalQty: 0,
};

export const useCartStore = create(persistNSync<CartType>((set, get) => ({
    cartProducts: INITIAL_STATE.cartProducts,
    cartTotalQty: INITIAL_STATE.cartTotalQty,
    handleAddProductToCart: (product) => {
      const products = get().cartProducts;
      const productInState = products?.find(
          (item) => item.id === product.id
      );

      if (productInState) {
          const updatedProducts = products?.map((item) =>
          item.id === productInState.id
              ? {
                  ...product,
                  cartTotalQty: item.quantity + product.quantity,
              }
              : item
          );
          toast.success("Item added to cart")
          set((state) => ({
          cartProducts: updatedProducts,
          cartTotalQty: state.cartTotalQty + product.quantity,
          }));
      } else {
          set((state) => ({
          cartProducts: [...state.cartProducts, product],
          cartTotalQty: state.cartTotalQty + product.quantity,
          // totalPrice: state.totalPrice + item.price,
          }));
      }
  },
}), {name:"cart"}))
        