import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:8000/account/auth/users/me/`,
        config
      );

      dispatch({
        type: "USER_LOADED_SUCCESS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOADED_FAIL",
      });
    }
  } else {
    dispatch({
      type: "USER_LOADED_FAIL",
    });
  }
};
const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `http://localhost:8000/account/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};

const LoginScreen = ({ login, isAuthenticated }) => {
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
    return redirect("/");
  }

  return (
    <div className="container mt-10">
      <h1>Sign In</h1>
      <p>Sign into your Account</p>
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
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(null, { login })(LoginScreen);
