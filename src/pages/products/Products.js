import React, { useContext, useState } from "react";
import "./products.css";
import { AllProducts } from "./productsData";
import { IoGrid } from "react-icons/io5";
import { HiOutlineViewList } from "react-icons/hi";
import { CartContext } from "../../context/CartContext";


const Products = () => {
  const { addToCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(1000);
  const [sort, setSort] = useState("latest");
  const [view, setView] = useState("grid");


  const categories = ["All", "Laptop", "Electronics", "Fashion", "Phone"];
  const brands = [
    "All", "Dell", "HP", "Samsung", "Tecno",
    "Adidas", "Sony", "Gucci", "Nike", "Roadster", "Fossil", "Puma"
  ];


  const filteredProducts = AllProducts
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => brand === "All" || p.brand === brand)
    .filter((p) => p.price <= price)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "latest") return b.id - a.id;
      if (sort === "lowest") return a.price - b.price;
      if (sort === "highest") return b.price - a.price;
      return 0;
    });

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(1000);
    setSearch("");
  };

  return (
    <div className="shop-container">
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map((c, i) => (
            <li
              key={i}
              onClick={() => setCategory(c)}
              className={c === category ? "active" : ""}
            >
              {c}
            </li>
          ))}
        </ul>

        <h3>Brand</h3>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {brands.map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>

        <h3>Price</h3>
        <input
          type="range"
          min="100"
          max="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p>Up to ${price}</p>

        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </aside>

      <main className="products-section">
        <div className="top-bar">
          <div className="view-toggle">
            <IoGrid
              onClick={() => setView("grid")}
              className={view === "grid" ? "active-icon" : ""}
            />
            <HiOutlineViewList
              onClick={() => setView("list")}
              className={view === "list" ? "active-icon" : ""}
            />
          </div>

          <p>{filteredProducts.length} Products found</p>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Sort by: Latest</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>

        <div className={view === "grid" ? "products-grid" : "products-list"}>
          {filteredProducts.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">${item.price}</p>

                {view === "list" && (
                  <>
                    <p className="product-brand">Brand: {item.brand}</p>
                    <p className="product-category">Category: {item.category}</p>
                    <p className="product-desc">
                      {item.description || "No description available."}
                    </p>
                  </>
                )}
                <button className="btn" onClick={() => addToCart(item)}>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;

