import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container hero">
        <h1>Welcome to RevoShop</h1>

        <p>
          Browse our latest collection of products and enjoy a seamless
          shopping experience.
        </p>

        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </StrictMode>,
)