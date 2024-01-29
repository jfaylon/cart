"use client";
import React, { useState } from "react";
import axios from "axios";

const AddToCartButton = ({ product, setCartCount }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
        {
          item: {
            ...product,
            quantity: 1,
          },
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        const count = response.data.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        setCartCount(count);
        setAdded(true);
        setTimeout(() => {
          setAdded(false);
        }, 1000);
      } else {
        console.error("Error adding product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-md ${
        isAdding || added ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isAdding || added}
    >
      {isAdding
        ? "Adding to Cart..."
        : added
        ? "Item Added Successfully"
        : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
