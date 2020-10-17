import React, { ReactElement, useEffect, useState } from 'react';
import './Catalog.css';
import Product from '../Product/Product';
import ProductData from '../../Interfaces/ProductData';


interface CatalogProps {
  onAddedProductsUpdate: ((products: ProductData) => void);
}
function Catalog(props: CatalogProps):ReactElement {
  const [addedProducts, setAddedProducts] = useState<ProductData[]>([]);
  const [productData, setProductData]: [(ProductData[] | null), Function] = useState<ProductData[]>([]);

  useEffect(() => {
    const apiUrl: string = "http://localhost:4000/products";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      }).catch(err => {
        console.log("Error fetching data: " + err);
      });
  }, [addedProducts]); 
  
  function productButtonClicked(product: ProductData): void {
    addedProducts.push(product);
    setAddedProducts(addedProducts);
    props.onAddedProductsUpdate(product);
  }


  return (
    <div className="Catalog col-9">
      <div className="contents">
          { productData.map((data: ProductData) => <Product key={data.id} data={data}  addToCartCallback={productButtonClicked}/>)}
      </div>
    </div>
  );
}

export default Catalog;