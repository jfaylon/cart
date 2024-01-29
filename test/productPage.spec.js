import React from "react";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ProductPage from "@/app/products/[id]/page";

// Create a new instance of axios-mock-adapter
const mockAxios = new MockAdapter(axios);

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props) => <img {...props} />,
}));

const mockProductData = {
  id: 1,
  title: "Test Product",
  description: "A test product description",
  price: 19.99,
  image: "test.jpg",
};

mockAxios
  .onGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/1`)
  .reply(200, mockProductData);

mockAxios.onPost(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`).reply(200, {
  quantity: 1,
  id: 1,
  title: "Test Product",
  description: "A test product description",
  price: 19.99,
  image: "test.jpg",
});

describe("ProductPage", () => {
  it("renders product details correctly", async () => {
    const result = await ProductPage({
      params: {
        id: 1,
      },
    });
    render(result);
    await waitFor(() => screen.getByText("Test Product"));

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A test product description")).toBeInTheDocument();
    expect(screen.getByText("Price: 19.99")).toBeInTheDocument();
    await act(() => {
      fireEvent.click(screen.getByText("Add to Cart"));
    })
    expect(screen.getByText("Item Added Successfully")).toBeInTheDocument();
  });
});
