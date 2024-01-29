"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import Header from "@/components/Header";

export default function Home(props) {
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
        withCredentials: true,
      })
      .then((response) => {});
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black shadow-md z-10 leading-10">
        <Header />
        <Categories selectedCategory={props.searchParams.category} />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        <ProductList category={props.searchParams.category} />
      </main>
    </div>
  );
}
