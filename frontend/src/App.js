import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/checkout/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import LoginScreen from "./scenes/home/LoginScreen";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";
import RegisterScreen from "./scenes/home/RegisterScreen";
import ActivateScreen from "./scenes/home/ActivateScreen";
import ResetPasword from "./scenes/home/ResetPasword";
import ProductListScreen from "./scenes/global/ProductListScreen";
import ConfirmPasswordReset from "./scenes/home/ConfirmPasswordReset";
import SignUpConfirmation from "./scenes/home/SignUpConfirmation";
import Dashboard from "./scenes/customer/CustomerDashboard";
import CustomerOrders from "./scenes/customer/CustomerOrders";
import { saveState } from "./localstorage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckoutSignin from "./scenes/checkout/CheckoutSignin";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

store.subscribe(() => {
  saveState(store.getState());
});

const stripePromise = loadStripe(
  "pk_test_51MHt3GADbUssSGYMdWu8rMnUoqe2MhtMtV6ip00bzqlQBwAs5ogREQjK59zKDHLn7gUOLrehGwPTUpbEsTVbqmSu007Fq3B0xS"
);

function App() {
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Layout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="item/:id" element={<ItemDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route
                exact
                path="/checkout/signin"
                element={<CheckoutSignin />}
              />
              <Route path="checkout/success" element={<Confirmation />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<RegisterScreen />} />
              <Route
                exact
                path="/activate/:uid/:token"
                element={<ActivateScreen />}
              />
              <Route
                exact
                path="/password/reset/confirm/:uid/:token"
                element={<ConfirmPasswordReset />}
              />
              <Route exact path="/reset-password" element={<ResetPasword />} />
              <Route
                exact
                path="/admin/productlist"
                element={<ProductListScreen />}
              />
              <Route
                exact
                path="/signup/confirmation"
                element={<SignUpConfirmation />}
              />
              <Route exact path="/customer/dashboard" element={<Dashboard />} />
              <Route
                exact
                path="/customer/orders"
                element={<CustomerOrders />}
              />
            </Routes>

            <CartMenu />
            <Footer />
          </Layout>
        </BrowserRouter>
      </Elements>
    </Provider>
  );
}

export default App;
