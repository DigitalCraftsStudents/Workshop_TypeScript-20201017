import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import CartItemDetail from '../../Interfaces/CartItemDetail';
import { amountToDollars } from '../../Utilities/utilites';


interface CartProps {
  addedProducts: Map<number, CartItemDetail>;
  updateAddedProducts: ((id: number, quantity: number) => void);
}
function Cart(props: CartProps): ReactElement {
  const [subTotal, setSubTotal] = useState(0);
  const [shippingEstimate, setShippingEstimate] = useState(0);
  const [tax, setTax] = useState(1.08);
  const [total, setTotal] = useState(0)
  const TAX_RATE: number = 0.08;
  const SHIPPING_RATE: number = 5;

  // Used here to update state when props change
  useEffect(() => {
    function calculateSubTotal(): number {
      let calculatedSubTotal: number = 0;
      props.addedProducts.forEach((cartItem: CartItemDetail, id: number) => {
        calculatedSubTotal += cartItem.quantity * cartItem.productData.price;
      }); 
      return calculatedSubTotal;
    }
  
    function calculateTax(newSubTotal: number, shipping: number): number {
      return (newSubTotal + shipping) * TAX_RATE;
    }
  
    function calculateEstimatedShipping(newSubTotal: number) {
      return newSubTotal === 0? 0: SHIPPING_RATE;
    }
  
    function calculateTotal(newSubTotal: number, newShippingEstimate: number, newTax: number): number {
      return newSubTotal === 0? 0 : newSubTotal + newShippingEstimate + newTax;
    }

    function calculateOrderSummary(): void {
      const calculatedSubTotal: number = calculateSubTotal();
      const calculatedShipping: number = calculateEstimatedShipping(calculatedSubTotal);
      const calculatedTax: number = calculateTax(calculatedSubTotal, calculatedShipping);
      const calculatedTotal: number = calculateTotal(calculatedSubTotal, calculatedTax, calculatedShipping);
  
      setSubTotal(calculatedSubTotal);
      setShippingEstimate(calculatedShipping);
      setTax(calculatedTax);
      setTotal(calculatedTotal);
    }
    calculateOrderSummary();
  }, [props.addedProducts]);

  function updateCartItem(id: number, quantity: number){
    props.updateAddedProducts(id, quantity);

  }

  function generateCartRows(): ReactElement[] {
    const productRows: ReactElement[] = [];
    props.addedProducts.forEach((cartItem: CartItemDetail, id: number) => {
      productRows.push(<CartItem key={id} data={cartItem.productData} quantity={cartItem.quantity} updateQuantity={updateCartItem}/>);
    });
    return productRows;
  }

  return (
    <div className="Cart col-3">
      <h5>Your Shopping Cart</h5>
      <div className="cart-items">
        {generateCartRows()}
      </div>
      <div>
        ORDER SUMMARY:
        <br/>
        Sub-total: {amountToDollars(subTotal)}
        <br/>
        Shipping Estimate: {amountToDollars(shippingEstimate)}
        <br/>
        Estimated Tax: {amountToDollars(tax)}
        <br/>
        <h5>Total {amountToDollars(total)}</h5>
        <Button> Check Out </Button>
      </div>
    </div>
  );
}

export default Cart;