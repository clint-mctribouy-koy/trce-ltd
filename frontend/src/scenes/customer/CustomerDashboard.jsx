import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { listMyOrders, load_user } from "../../actions/auth";

function Dashboard({ load_user, isAuthenticated }) {
  const [items, setItem] = useState([]);
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      const user_id = localStorage.getItem("user");
      const response = await axios.get(
        `http://localhost:8000/api/${user_id}/orders/`
      );
      setItem(response.data);
      console.log("HELLO", user_id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    load_user();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    // dispatch(listMyOrders());
  }
  const customer0rders = items.filter((item) => item.user);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SideBar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4> Total Orders</h4>
                  <h4>
                    <Link to="/customer/orders">{customer0rders.length} </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { load_user })(Dashboard);
