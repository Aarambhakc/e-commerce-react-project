import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Productcard from "../components/ProductCard";
import "./RelatedProducts.css";

function RelatedProducts({
  category,
  currentId,
}) {
  console.log("RelatedProducts rendered");
  const [related, setRelated] =
    useState([]);

  useEffect(() => {
    async function fetchRelated() {
      const products =
        await getProducts();


      const filtered =
        products
          .filter(
            (p) =>
              p.category === category &&
              p.id !== Number(currentId)
          )
          .slice(0, 4);

      setRelated(filtered);
    }

    fetchRelated();
    
  }, [category, currentId]);

  if (related.length === 0)
    return null;

  return (
    <section className="related-products">
      <h2>From the Same Collection</h2>

      <div className="products-grid">
        {related.map((product) => (
          <Productcard

            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;