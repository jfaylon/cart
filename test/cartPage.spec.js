import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CartPage from "@/app/cart/page";

const mockAxios = new MockAdapter(axios);

const mockCartData = [
  { id: 1, title: "Product 1", price: 10.99, quantity: 2, image: "/test.jpg" },
];

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props) => <img {...props} />,
}));

mockAxios
  .onGet(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`)
  .reply(200, mockCartData);

// note: the test only triggers the +
mockAxios
  .onPatch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/1`)
  .reply(200, [{ ...mockCartData[0], quantity: 3 }]);

describe("CartPage", () => {
  it("should render CartPage and update quantity on CartItem button click", async () => {
    render(<CartPage params={{}} />);

    await waitFor(() => screen.getByText("Product 1"));

    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("+"));

    await waitFor(() => screen.getByText("3"));

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
