import React, { ReactElement } from 'react';
import './CartItem.css';
import ProductData from '../../Interfaces/ProductData';
import { amountToDollars } from '../../Utilities/utilites';

interface ProductProps {
  data: ProductData;
  quantity: number;
  updateQuantity: ((id: number, quantity: number) => void);
}

function CartItem(props: ProductProps): ReactElement {

  function decreaseQuantity():void {
    props.updateQuantity(props.data.id, props.quantity - 1)
  }

  function increaseQuantity(): void {
    props.updateQuantity(props.data.id, props.quantity + 1)
  }
  
  return (
    <div className="CartItem">
      <div>
        <img src={process.env.PUBLIC_URL + props.data.imageSource} alt={props.data.name} width={40} height={40}/>
      </div>
      <div>
        {props.data.name}
      </div>
      <div>
        {amountToDollars(props.data.price)}
      </div>  
      <div className="quantity-selector">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dash-square-fill icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={decreaseQuantity}>
          <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
        </svg>
        {props.quantity}
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={increaseQuantity}>
          <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
      </div>
    </div>
  );
}

export default CartItem;