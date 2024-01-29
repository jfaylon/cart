"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import FadeLoader from "react-spinners/FadeLoader";

const ProductList = ({ category }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products${
          category ? `/categories/${category}` : ""
        }`
      )
      .then((response) => {
        setProductData(response.data.products || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  return isLoading ? (
    <div className="flex items-center justify-center h-full">
      <FadeLoader color="#FFFFFF" />
    </div>
  ) : (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      data-testid="product-list"
    >
      {productData.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default ProductList;
