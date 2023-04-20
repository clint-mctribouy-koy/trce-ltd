import React, { useEffect } from "react";
import { connect } from "react-redux";
import { load_user } from "../actions/auth";
import NavigationBar from "../scenes/global/Navbar";

const Layout = ({ load_user, children }) => {
  useEffect(() => {
    // checkAuthenticated();
    load_user();
  }, []);

  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

export default connect(null, { load_user })(Layout);
