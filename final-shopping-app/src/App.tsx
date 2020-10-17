import React, { ReactElement, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';
import ProductData from './Interfaces/ProductData';
import CartItemDetail from './Interfaces/CartItemDetail';

function App(): ReactElement {
  const [addedProducts, setAddedProducts] = useState<Map<number, CartItemDetail>>(new Map());

  function addedProductsUpdated(product: ProductData): void {
    if (addedProducts.has(product.id)){
      const updatedProductData: CartItemDetail = addedProducts.get(product.id)!;
      updatedProductData.quantity += 1;
      addedProducts.set(product.id, updatedProductData);
    } else {
      const newProductData: CartItemDetail = {productData: product, quantity: 1}
      addedProducts.set(product.id, newProductData);
    }
    setAddedProducts(new Map<number, CartItemDetail>(addedProducts));
  }

  function updateAddedProducts(productId: number, newQuantity:number) {
    addedProducts.forEach((cartItem: CartItemDetail, id: number) => {
      if (id === productId ){
        if (newQuantity === 0) {
          addedProducts.delete(id);
        } else {
          addedProducts.get(id)!.quantity = newQuantity; 
        }
      }
    }); 
    setAddedProducts(new Map<number, CartItemDetail>(addedProducts));
  }

  return (
    <div className="App">
      <Header/>
      <div className="content">
        <Catalog onAddedProductsUpdate={addedProductsUpdated}/>
        <Cart addedProducts={addedProducts} updateAddedProducts={updateAddedProducts}/>
      </div>
    </div>
  );
}

export default App;
