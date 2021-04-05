import Button from "@material-ui/core/Button";
import { Product } from "../../common/interfaces/product";
import { ItemCardStyles } from "./item-card.styles";

interface ItemCardProps {
  item: Product;
  handleAddItemToCard: (product: Product) => void;
}

export const ItemCard: React.FC<ItemCardProps> = (props: ItemCardProps) => (
  <ItemCardStyles>
    <img src={props.item.image} alt={props.item.title} />
    <div>
      <h3>{props.item.title}</h3>
      <p>{props.item.description}</p>
      <span>${props.item.price}</span>
    </div>
    <Button onClick={() => props.handleAddItemToCard(props.item)}>
      Add to cart
    </Button>
  </ItemCardStyles>
);
