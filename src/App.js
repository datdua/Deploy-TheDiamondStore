import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// actor: Customer
import AboutPage from "./pages/About/AboutPage";
import BackToTop from "./components/BackToTop";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import ContactPage from "./pages/Contact/ContactPage";
import DiamondDetailPage from "./pages/ProductDetail/DiamondDetailPage";
import DiamondPage from "./pages/Product/DiamondPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import JewelryDetailPage from "./pages/ProductDetail/JewelryDetailPage";
import JewelryPage from "./pages/Product/JewelryPage";
import LoginRegisterPage from "./pages/LoginRegister/LoginRegisterPage";
import MyAccountPage from "./pages/MyAccount/MyAccountPage";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProductPage from "./pages/Product/ProductPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";

// actor: Admin
import AccountManager from "./pages/Manager/AccountManager/AccountManager";
import JewelryManagerPage from "./pages/Manager/JewelryManager/JewelryManagerPage";
import PaymentConfirm from "./pages/PaymentConfirm/PaymentConfirm";
import ProfilePage from "./pages/Profile/ProfilePage";
import GoldPriceManager from "./pages/Manager/PriceProductManager/GolPriceManagerPage";
import Dashboard from "./pages/DashBoard/DashBoard";
import Knowledge from "./pages/Knowledge/Knowledge";
import OrderManagerPage from "./pages/Manager/OrderManager/OrderManagePager";
import ProductManagerPage from "./pages/Manager/DiamondManager/DiamondManager";
import SideBarAdmin from "./components/Sidebar/SidebarAdmin";
import TransactionManagerPage from "./pages/Manager/TransactionManager/TransactionManagerPage";
import CertificateManagerPage from "./pages/Manager/CertificateManager/CertificateManagerPage";
import DiamondPriceManager from "./pages/Manager/PriceProductManager/DiamondPriceManagerPage";
import WarrantyDiamondManagerPage from "./pages/Manager/WarrantyManager/WarrantyDiamondManagerPage";
import WarrantyJewelryManagerPage from "./pages/Manager/WarrantyManager/WarrantyJewelryManagerPage";
import PromotionManagerPage from "./pages/Manager/PromotionManager/PromotionManagerPage";
import { AuthProvider } from "./components/Auth/AuthProvider";
import ScrollToTop from "./components/ScrollToTop";
import EmailConfirm from "./pages/EmailConfirm/EmailConfirm";
import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm";


function App() {
  const handleLogout = (logoutCallback) => {
    if (logoutCallback) {
      logoutCallback();
    }
  };

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider logoutCallback={() => handleLogout(handleLogout)}>
        <ScrollToTop/>
        <Routes>
          {/* actor: Customer */}
          <Route path="/" element={<> <Header /> <HomePage /> <Footer /> <BackToTop /> </>} />
          <Route path="/dangnhap" element={<> <Header /> <LoginRegisterPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/xacthucthanhtoan" element={<> <Header /> <PaymentConfirm /> <Footer /> <BackToTop /> </>} />
          <Route path="/trangchu" element={<> <Header /> <HomePage /> <Footer /> <BackToTop /> </>} />
          <Route path="/gioithieu" element={<> <Header /> <AboutPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/lienhe" element={<> <Header /> <ContactPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/sanpham" element={<> <Header /> <ProductPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/trangsuc" element={<> <Header /> <JewelryPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/kimcuong" element={<> <Header /> <DiamondPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/cart/:accountId" element={<> <Header /> <CartPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/product-detail/jewelry/:jewelryId" element={<> <Header /> <JewelryDetailPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/product-detail/diamond/:diamondId" element={<> <Header /> <DiamondDetailPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/account/:accountId" element={<> <Header /> <MyAccountPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/checkout/:accountId" element={<> <Header /> <CheckoutPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/wishlist" element={<> <Header /> <WishlistPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/portfolio" element={<> <Header /> <PortfolioPage /> <Footer /> <BackToTop /> </>} />
          <Route path="/kienthuckimcuong" element={<> <Header /> <Knowledge /> <Footer /> <BackToTop />  </> }/>
          <Route path="/xacthucemail" element={<><Header/><EmailConfirm/><Footer/></>}/>
          <Route path="/datlaimatkhau" element={<><Header/><ResetPasswordForm/><Footer/></>}/>
          {/* actor: //Customer */}

          {/* actor: Admin */}
          <Route path="/admin/*" element={<SideBarAdmin />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="diamond/diamond-manager" element={<ProductManagerPage />} />
            <Route path="diamond/warranty-manager" element={<WarrantyDiamondManagerPage />} />
            <Route path="jewelry/warranty-manager" element={<WarrantyJewelryManagerPage />} />
            <Route path="account-manager" element={<AccountManager />} />
            <Route path="jewelry/jewelry-manager" element={<JewelryManagerPage />} />
            <Route path="promotion-manager" element={<PromotionManagerPage />} />
            <Route path="order-manager" element={<OrderManagerPage />} />
            <Route path="jewelry/price/gold-price-manager" element={<GoldPriceManager />} />
            <Route path="diamond/price/diamond-price-manager" element={<DiamondPriceManager />} />
            <Route path="transaction-manager" element={<TransactionManagerPage />} />
            <Route path="diamond/certificate-manager" element={<CertificateManagerPage />} />
          </Route>
          {/* actor: //Admin */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
