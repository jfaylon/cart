"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";

const Categories = ({ selectedCategory }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories`
        );
        setCategoriesList(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toTitleCase = (string) => {
    return string.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  };

  return isLoading ? (
    <div className="flex items-center justify-center h-full">
      <FadeLoader color="#FFFFFF" />
    </div>
  ) : (
    <div
      className="flex flex-row justify-around border-b-2"
      data-testid="categories"
    >
      {categoriesList.map &&
        categoriesList.map((category) => (
          <Link
            className={`mx-3 cursor-pointer ${
              selectedCategory === category ? "font-bold" : ""
            }`}
            href={`/?category=${category}`}
          >
            {toTitleCase(category)}
          </Link>
        ))}
    </div>
  );
};

export default Categories;
