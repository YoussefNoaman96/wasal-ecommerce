import { Route, Routes, useLocation } from "react-router-dom"
import { lazy, Suspense, useState } from "react"

import BtmHeader from "./components/header/BtmHeader"
import TopHeader from "./components/header/TopHeader"
import { Toaster } from "react-hot-toast"
import ScrollToTop from "./components/ScrollToTop"
import { AnimatePresence } from "framer-motion"
import Footer from "./components/footer/Footer"
import ScrollToTopButton from "./components/scrollToTopButton/ScrollToTopButton"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import PageLoading from "./components/pageLoading/PageLoading"

const Home = lazy(() => import("./pages/Home/Home"))
const ProductDetails = lazy(() => import("./pages/productDetails/ProductDetails"))
const Cart = lazy(() => import("./pages/cart/Cart"))
const CategoryPage = lazy(() => import("./pages/CategoryPage/CategoryPage"))
const SearchResults = lazy(() => import("./pages/Search/SearchResults"))
const Favorites = lazy(() => import("./pages/favorites/Favorites"))
const AuthLayout = lazy(() => import("./pages/auth/AuthLayout"))
const About = lazy(() => import("./pages/About/About"))
const Categories = lazy(() => import("./pages/Categories/Categories"))
const Checkout = lazy(() => import("./pages/Checkout/Checkout"))

function App() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {!isAuthPage && (
        <header>
          <TopHeader   setIsSidebarOpen={setIsSidebarOpen}/>
          <BtmHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </header>
      )}

      <Toaster
        position="top-right"
        containerStyle={{
          top: 'var(--toast-top)',
        }}
        toastOptions={{
          style: {
            background: '#e9e9e9',
            borderRadius: '5px',
            padding: '14px',
          }
        }}
      />

      <main className={isAuthPage ? "auth-main" : "main_content"}>
        <ScrollToTop />
        {!isAuthPage && <ScrollToTopButton />}

        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/login" element={<AuthLayout />} />
              <Route path="/register" element={<AuthLayout />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>} />

              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>} />
                
              <Route path="/search" element={<SearchResults />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        {!isAuthPage && location.pathname !== '/checkout' && (
          <Footer />
        )}
      </main>
    </>
  )
}

export default App