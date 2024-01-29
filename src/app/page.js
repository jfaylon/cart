"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import Header from "@/components/Header";

export default function Home(props) {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
        withCredentials: true,
      })
      .then((response) => {
        const count =
          response.data?.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0) || 0;
        setCartCount(count);
      });
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black shadow-md z-10 leading-10">
        <Header cartCount={cartCount} />
        <Categories selectedCategory={props.searchParams.category} />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        <ProductList category={props.searchParams.category} />
      </main>
    </div>
  );
}
