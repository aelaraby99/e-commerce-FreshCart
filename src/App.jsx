import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/Notfound/NotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Resgister/Register";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import AuthenticationProvider from "./Contexts/Authentication";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartProvider from "./Contexts/Cart";
import Cart from "./Components/Cart/Cart";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children:
      [
        { path: "/", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "home", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
        { path: "productdetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: "*", element: <ProtectedRoute> <NotFound /> </ProtectedRoute> },
      ]
  }
]);

export default function App() {
  const CLient = new QueryClient();
  return (
    <QueryClientProvider client={CLient} >
      <CartProvider>
        <AuthenticationProvider>
          <ToastContainer />
          <RouterProvider router={router} >

          </RouterProvider>
        </AuthenticationProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
