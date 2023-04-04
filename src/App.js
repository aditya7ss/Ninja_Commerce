import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

import { NavBar } from "./components/navbar";
import { Products } from "./pages/products";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { NotFound } from "./pages/not-found";

import { useCart } from "./context/cart";
import Sort from "./pages/sort/Sort";
import { FakeStoreApi } from "./services/fake-store-api";
function App() {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  const onSearch = (searchQuery) => {
    navigate(`/?${createSearchParams({ q: searchQuery })}`);
  };

  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [sort, setSort] = React.useState("high");
  const [query] = useSearchParams();
  const searchQuery = query.get("q");
  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = searchQuery
        ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery)
        : await FakeStoreApi.fetchAllProducts();
      setProducts(products);
      setLoading(false);
    };
    fetchProducts().catch(console.error);
  }, [searchQuery]);

  const sortProductIn = () => {
  
    if (products) {
      products.sort(function (a, b) {
        return b.price - a.price;
      });
    }
  };

  const sortProductDe = () => {
 if (products) {
      products.sort(function (a, b) {
        return a.price - b.price;
      });
    }
  };

  React.useEffect(() => {
    if (sort === "high") {
      sortProductIn();
    } else if (sort === "low") {
      sortProductDe();
    }
  }, [sort]);

  return (
    <>
      <NavBar onSearch={onSearch} cartItemCount={cartItemCount()} />
      <Sort setSort={setSort} sort={sort}></Sort>
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={products}
              loading={loading}
              searchQuery={searchQuery}
            />
          }
        />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
