import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import LoginScreen from "./scenes/home/LoginScreen";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";
import RegisterScreen from "./scenes/home/RegisterScreen";
import ActivateScreen from "./scenes/home/ActivateScreen";
import ResetPasword from "./scenes/home/ResetPasword";
import ConfirmPasswordReset from "./scenes/home/ConfirmPasswordReset";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:id" element={<ItemDetails />} />
            <Route path="checkout" element={<Checkout />} />
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
          </Routes>

          <CartMenu />
          <Footer />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
