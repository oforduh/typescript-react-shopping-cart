import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { ShoppingCartObject } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import CartItemComponent from "../cartItemComponent/CartItemComponent";
import storeItemsJson from "../../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = ShoppingCartObject();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItemComponent key={item.id} {...item} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItemsJson.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}{" "}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
