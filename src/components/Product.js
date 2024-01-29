import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <div>
      <Link href={`/products/${[product.id]}`}>
        <Image
          layout="responsive"
          src={product.image}
          alt={product.title}
          width={10}
          height={10}
        />
        <p>{product.title}</p>
        <p>Price: {product.price}</p>
      </Link>
    </div>
  );
};

export default Product;
