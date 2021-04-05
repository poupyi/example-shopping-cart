import Button from "@material-ui/core/Button";
import React from "react";
import { CartProduct } from "../../common/interfaces/cart-product";
import { CartItemStyles } from "./cart-item.styles";

interface CartItemProps {
  item: CartProduct;
  addToCart: (selectedProduct: CartProduct) => void;
  removeFromCart: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = (props: CartItemProps) => (
  <CartItemStyles>
    <div>
      <h3>{props.item.title}</h3>
      <div className="product-informations">
        <p>Price: ${props.item.price}</p>
        <p>Total: ${(props.item.amount * props.item.price).toFixed(2)}</p>
      </div>
      <div className="buttons-group">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => props.removeFromCart(props.item.id)}
        >
          -
        </Button>
        <p>{props.item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => props.addToCart(props.item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={props.item.image} alt={props.item.title} />
  </CartItemStyles>
);
