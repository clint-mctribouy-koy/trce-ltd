import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { load_user } from "../../actions/auth";

function CustomerOrders({ isAuthenticated, load_user }) {
  const [items, setItem] = useState([]);
  const user_id = localStorage.getItem("user");

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/${user_id}/orders/`
      );
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    load_user();
  }, []);

  const customer0rders = items.filter((item) => item.user);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 col-12">
          <SideBar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="table-reponsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Shipping Information</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {customer0rders.map((order, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index}</td>
                      <td>
                        <img
                          src="https://th.bing.com/th/id/R.5269bd90d2ef3a130a0ae6f4a4897692?rik=cGkrX9GUTLb6NA&riu=http%3a%2f%2fwww.tshirtfactory.com%2fimages%2fgildan-8000-black.jpg&ehk=fykF8qTla4bb3MghxF4TTSQDZ1KVTuo0YDGyL%2fOOKjk%3d&risl=&pid=ImgRaw&r=0"
                          alt=""
                          className="img-thumbnail"
                          width="80"
                        />
                        <p>Black T-Shirt</p>
                      </td>
                      <td>{order.total_price}</td>
                      <td>{order.shipping_address}</td>
                      <td>
                        <span className="text-success">
                          <i className="fa fa-check-circle"></i>{" "}
                          {order.is_ordered ? " Completed" : "Not Complete"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
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

export default connect(mapStateToProps, { load_user })(CustomerOrders);
