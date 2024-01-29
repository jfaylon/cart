import React from "react";
import AddToCartButton from "@/components/AddToCartButton";
import Header from "@/components/Header";
import axios from "axios";
import Image from "next/image";

const ProductPage = async ({ params }) => {
  
  const { data: productData } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params?.id}`
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 space-y-8">
      <Header />
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
            <AddToCartButton product={productData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
