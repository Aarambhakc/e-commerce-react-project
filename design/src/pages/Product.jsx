import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
} from "../services/productservice";

import Productcard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";

import "./Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [productData, categoryData] =
          await Promise.all([
            getProducts(),
            getCategories(),
          ]);

        setProducts(productData);
        setCategories(categoryData);
        console.log("Products:", productData);
console.log("Categories:", categoryData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category === category;
       category.trim().toLowerCase();
    return matchesSearch && matchesCategory;
  });

  let displayedProducts = [...filteredProducts];

  if (sort === "low-high") {
    displayedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    displayedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (loading) {
    return (
      <div className="products-grid">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="products-page">
      <div className="products-hero">
        <h1>Collections</h1>

        <p>
          Timeless tailoring,
          exceptional craftsmanship,
          and understated luxury.
        </p>
      </div>

      <div className="products-toolbar">

        <SearchBar
          search={search}
          setSearch={setSearch}
          products={products}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.name}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="low-high">
            Price: Low to High
          </option>

          <option value="high-low">
            Price: High to Low
          </option>
        </select>

      </div>

      <div className="products-grid">
        {displayedProducts.map((product) => (
          <Productcard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default Product;