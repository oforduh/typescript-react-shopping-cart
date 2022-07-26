import React from "react";
import { Button, Card } from "react-bootstrap";
import { ShoppingCartObject } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const Storeitems = ({ id, name, price, imgUrl }: StoreItemsProps) => {
  const {
    getItemQuantity,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromCart,
  } = ShoppingCartObject();
  let quantity = getItemQuantity(id);
  return (
    <div>
      <Card key={id} className="h-100">
        <Card.Img
          variant="top"
          src={imgUrl}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={() => increaseCardQuantity(id)}
              >
                + Add To cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCardQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity} </span>
                    In Cart
                  </div>
                  <Button onClick={() => increaseCardQuantity(id)}>+</Button>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(id)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Storeitems;
