import React from "react";
import { Col, Row } from "react-bootstrap";
import Storeitems from "../../components/storeItems/Storeitems";
import storeItemsJson from "../../data/items.json";




const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItemsJson.map((item) => (
          <Col key={item.id}><Storeitems {...item}/></Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
