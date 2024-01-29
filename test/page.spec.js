import React from "react";
import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import Home from "@/app/page";

import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("Home component", () => {
  it("renders Home component with mock data", async () => {
    const mockCartData = [
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        quantity: 2,
        image: "/test.jpg",
      },
    ];
    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`)
      .reply(200, mockCartData);

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/electronics`)
      .reply(200, []);

      mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories`)
      .reply(200, []);

    // Mock props
    const props = {
      searchParams: {
        category: "electronics",
      },
    };

    await act(async () => {
      // Render the component
      await render(<Home {...props} />);
    });

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();

    const categoriesElement = screen.getByTestId("categories");
    expect(categoriesElement).toBeInTheDocument();

    const productListElement = screen.getByTestId("product-list");
    expect(productListElement).toBeInTheDocument();
  });
});
