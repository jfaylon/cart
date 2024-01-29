"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

const CartItem = ({ item, updateCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${item.id}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const cartItem = response.data.find((cartItem) => {
          return cartItem.quantity;
        });
        setQuantity(cartItem.quantity);
        updateCart();
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  return (
    <div className="flex items-center justify-between border-b-2 py-2">
      <div className="flex items-center space-x-4">
        <Image
          src={item.image}
          alt={item.title}
          className="w-12 h-12 object-cover rounded"
          width={200}
          height={200}
        />
        <div>
          <p className="text-xl font-bold">{item.title}</p>
          <p>{`Price: $${Number(item.price).toFixed(2)}`}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-full"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <p className="mx-2">{`${quantity}`}</p>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-full"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
