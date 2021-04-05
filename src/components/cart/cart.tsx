import React from "react";
import { CartItem } from "../cart-item/cart-item";
import { CartStyles } from "./cart.styles";
import { CartProduct } from "../../common/interfaces/cart-product";

interface CartProps {
  cartProducts: CartProduct[];
  addToCart: (selectedProduct: CartProduct) => void;
  removeFromCart: (productId: number) => void;
}

export const Cart: React.FC<CartProps> = (props: CartProps) => {
  const calculateTotal = (cartProducts: CartProduct[]) =>
    cartProducts.reduce(
      (acc, product) => acc + product.amount * product.price,
      0
    );

  return (
    <CartStyles>
      <h2>Your Shopping Cart</h2>
      {props.cartProducts.length === 0 ? <p>No items in cart.</p> : null}
      {props.cartProducts.map((cartProduct) => (
        <CartItem
          key={cartProduct.id}
          item={cartProduct}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(props.cartProducts).toFixed(2)}</h2>
    </CartStyles>
  );
};
