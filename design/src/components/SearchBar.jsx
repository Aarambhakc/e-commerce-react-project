import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ products }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions =
    query.trim() === ""
      ? []
      : products
          .filter((product) =>
            product.title
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .slice(0, 5);

  return (
    <div className="search-bar">

      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search collections..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      {suggestions.length > 0 && (
        <div className="suggestions">

          {suggestions.map((product) => (
            <div
              key={product.id}
              className="suggestion"
              onClick={() => {
                navigate(`/product/${product.id}`);
                setQuery("");
              }}
            >
              <img
                src={product.image}
                alt={product.title}
              />

              <div className="suggestion-info">
                <h4>{product.title}</h4>
                <p>${product.price}</p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SearchBar;