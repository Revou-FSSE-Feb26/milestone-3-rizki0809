import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import products from "../../data/products";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(
        (item) => item.id === Number(id)
      );

      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 className="loading">Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container detail">
        <img
          src={product.image}
          alt={product.name}
        />

        <div>
          <h1>{product.name}</h1>

          <h2>${product.price}</h2>

          <p>{product.description}</p>

          <button>Add to Cart</button>
        </div>
      </div>
    </>
  );
}