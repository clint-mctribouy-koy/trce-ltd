import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../actions/auth";

const LoginScreen = ({ login, isAuthenticated, isAdmin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/checkout" replace />;
  }

  return (
    <div className="container mt-5">
      <h2>CHECKOUT</h2>

      <p>Sign into your account to complete purchase</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p className="mt-3">
        Forgot your Password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { login })(LoginScreen);
