import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "../../API";
import { connect } from "react-redux";
import { load_user } from "../../actions/auth";
import { Navigate } from "react-router-dom";
import AdminSideBar from "../admin/AdminSideBar";
const AddProduct = ({ isAuthenticated, isAdmin }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [itemId, setItemId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    listProducts();
  }, []);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const listProducts = () => {
    API.get("/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, price, brand };
    API.post("/", item).then(() => listProducts());
  };

  const onUpdate = (id) => {
    let item = { name, price, brand };
    API.patch(`/${id}/`, item).then((res) => listProducts());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => listProducts());
  };

  function selectItem(id) {
    let item = products.filter((product) => product._id === id)[0];
    setName(item.name);
    setPrice(item.price);
    setBrand(item.brand);
    setItemId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 col-12">
          <AdminSideBar />
        </div>
        <div className="col-md-4">
          <h3 className="float-left">Create a new Product</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{itemId}Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand "
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button variant="primary" type="submit" onClick={onSubmit}>
                Save
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{product._id}</th>
                    <td> {product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand}</td>

                    <td>
                      <Button
                        variant="primary"
                        onClick={() => selectItem(product._id)}
                        className="mx-2"
                        size="sm"
                      >
                        EDIT
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => onUpdate(product._id)}
                        className="mx-2"
                        size="sm"
                      >
                        SAVE EDIT
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => onDelete(product._id)}
                        className="mx-2"
                        size="sm"
                      >
                        DELETE
                      </Button>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { load_user })(AddProduct);
