import React from 'react';
import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import Home from "@/app/page";

jest.mock("axios");

describe("Home component", () => {
  it("renders Home component with mock data", async () => {
    // Mock the axios.get function
    axios.get.mockResolvedValue({ data: {} });

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

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`,
      {
        withCredentials: true,
      }
    );
  });
});
