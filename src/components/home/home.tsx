import { useQuery } from "react-query";
import { Product } from "../../common/interfaces/product";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { ItemCard } from "../item-card/item-card";
import { HomeStyles } from "../home/home.styles";
import { ButtonStyled } from "../../common/styles/button.styles";
import { useState } from "react";
import { CartProduct } from "../../common/interfaces/cart-product";
import { Cart } from "../cart/cart";

const getProducts = async (): Promise<Product[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

export const Home: React.FC<{}> = () => {
  const [isCartOpen, setCartIsOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { data, isLoading, error } = useQuery<Product[]>(
    "products",
    getProducts
  );

  const getTotalIems = (cartItems: CartProduct[]) =>
    cartItems.reduce((acc: number, item) => acc + item.amount, 0);

  const handleAddToCart = (product: Product) => {
    setCartProducts((prevState) => {
      const productAlreadyInCart = prevState.find(
        (productInCart) => product.id === productInCart.id
      );
      if (productAlreadyInCart) {
        return prevState.map((productInCart) =>
          productInCart.id === product.id
            ? { ...productInCart, amount: productInCart.amount + 1 }
            : productInCart
        );
      }

      return [...prevState, { ...product, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (productId: number) => {
    setCartProducts((prevState) => {
      return prevState.reduce((acc, productInCart) => {
        if (productInCart.id === productId) {
          if (productInCart.amount === 1) {
            return acc;
          }
          return [
            ...acc,
            { ...productInCart, amount: productInCart.amount - 1 },
          ];
        } else {
          return [...acc, productInCart];
        }
      }, [] as CartProduct[]);
    });
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  console.log(data);
  return (
    <HomeStyles>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setCartIsOpen(false)}
      >
        <Cart
          cartProducts={cartProducts}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <ButtonStyled onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalIems(cartProducts)} color="error"></Badge>
        <AddShoppingCartIcon />
      </ButtonStyled>
      <Grid className="product-lists" container spacing={3}>
        {data?.map((product) => (
          <Grid item key={product.id} xs={12} sm={4}>
            <ItemCard
              item={product}
              handleAddItemToCard={handleAddToCart}
            ></ItemCard>
          </Grid>
        ))}
      </Grid>
    </HomeStyles>
  );
};
