"use client";
import React, { useState, useEffect } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import Header from "@/components/Header";
import axios from "axios";
import Image from "next/image";

const ProductPage = ({ params }) => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
        withCredentials: true,
      })
      .then((response) => {
        const count = response.data.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        setCartCount(count);
      });
  }, []);

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params?.id}`
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [params?.id]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black shadow-md z-10 leading-10">
        <Header cartCount={cartCount} />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-around p-24 space-y-8">
        {productData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="mx-auto">
              <div className="max-w-md">
                <Image
                  layout="responsive"
                  src={productData.image}
                  alt={productData.title}
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold mb-2">{productData.title}</p>
              <p className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl">
                {productData.description}
              </p>
              <br />
              <p className="text-base sm:text-sm md:text-md lg:text-lg xl:text-xl">
                {`Price: ${productData.price}`}
              </p>
              <div className="max-w-auto">
                <AddToCartButton
                  product={productData}
                  setCartCount={setCartCount}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
