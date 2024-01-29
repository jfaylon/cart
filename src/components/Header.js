import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div
      className="flex flex-row justify-between w-full border-b-2"
      data-testid="header"
    >
      <Link className="mx-10" href={"/"}>
        Home
      </Link>
      {""}
      <Link className="mx-10" href={"/cart"}>
        View Cart
      </Link>
    </div>
  );
};

export default Header;
