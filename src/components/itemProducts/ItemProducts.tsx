import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ListItem,
  Button,
} from "@mui/material";
import { Colors } from "../../styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart/cart_slice";
import { useTranslation } from "react-i18next";
import { getIsLoggedIn } from "../../redux/auth/auth-selectors";
import { addProducts } from "../../redux/cart/cart_operations";

export interface ItemProductsProps {
  id: number;
  image: string;
  text: string;
  price: number;
  quantity: number;
}

export default function ItemProducts({
  id,
  image,
  text,
  price,
  quantity,
}: ItemProductsProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const onAddToCart = () => {
    const cartItem = {
      id,
      text,
      image,
      price,
      quantity,
      totalPrice: price * quantity,
    };

    isLoggedIn
      ? dispatch(addProducts(cartItem))
      : dispatch(cartActions.addItemToCart(cartItem));
  };
  return (
    <ListItem
      sx={{
        width: { xs: "100%", md: "50%" },
      }}
    >
      <Card
        sx={{
          width: {
            xs: "100%",
            md: "300px",
            transition: "transform 0.2s ease-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        <CardMedia
          component={Link}
          to={`/${t("product")}/${text}`}
          image={image}
          sx={{
            height: { xs: "200px", sm: "300px" },
            borderRadius: "5px",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />

        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{ fontSize: { xs: 15, sm: 20, md: 22 }, fontWeight: 700 }}
          >
            {text}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: Colors.warning,
              fontSize: { xs: 13, sm: 19 },
            }}
          >
            {price} {t("currency")}
          </Typography>
          <Button
            onClick={onAddToCart}
            sx={{
              color: Colors.black,
              fontSize: { xs: 11, sm: 17 },
              fontWeight: 600,
              display: "flex",
              alignItems: "baseline",
              margin: "0 auto",
            }}
          >
            <ShoppingBasketIcon
              sx={{ fontSize: { xs: 11, sm: 17 }, mr: 0.3 }}
            />
            {t("addToCard")}
          </Button>
        </CardContent>
      </Card>
    </ListItem>
  );
}
