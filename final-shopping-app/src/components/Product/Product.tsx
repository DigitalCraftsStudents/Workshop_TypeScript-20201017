import React, { ReactElement } from 'react';
import './Product.css';
import ProductData from '../../Interfaces/ProductData';
import { Button } from 'react-bootstrap';
import { amountToDollars } from '../../Utilities/utilites';

interface ProductProps {
  data: ProductData;
  addToCartCallback: ((data: ProductData) => void);
}

function Product(props: ProductProps): ReactElement {

  function addProductToCart(): void {
    props.addToCartCallback(props.data);
  }
  
  return (
    <div className="Product">
      <img src={process.env.PUBLIC_URL + props.data.imageSource}  alt={props.data.name} width={100} height={100}/>
      <br/>
      <h6>{props.data.name}</h6>
      {amountToDollars(props.data.price)}
      <br/>
      {props.data.description}
      <Button onClick={addProductToCart}>Add to Cart</Button>
    </div>
  );
}

export default Product;