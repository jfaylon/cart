"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import CartItem from "@/components/CartItem";
import { CART_TITLE } from "@/app/constants";

const CartPage = ({ params }) => {
  const [cart, setCart] = useState([]);
  const updateCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCart(response.data);
      } else {
        console.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black shadow-md z-10 leading-10">
        <Header />
      </div>
      <main className="flex min-h-screen flex-col items-center p-24 space-y-20">
        <p className="text-xl font-bold">{CART_TITLE}</p>
        {cart.length > 0 ? (
          <div className="max-w-2xl w-full mt-16">
            <div className="flex flex-col">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} updateCart={updateCart} />
              ))}
              <div className="mt-4 self-end">
                <p className="text-xl font-bold">
                  Total Price: ${calculateTotalPrice()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No Items in Cart</p>
        )}
      </main>
    </div>
  );
};

export default CartPage;
