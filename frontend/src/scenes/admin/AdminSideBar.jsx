import { Link } from "react-router-dom";

function AdminSideBar() {
  return (
    <div className="list-group">
      <Link
        to="/admin/dashboard"
        className="list-group-item list-group-item-action"
      >
        {" "}
        Dashboard
      </Link>
      <Link href="#!" className="list-group-item list-group-item-action">
        {" "}
        Orders
      </Link>

      <Link
        to="/admin/productlist"
        className="list-group-item list-group-item-action"
      >
        {" "}
        Add / Edit Products
      </Link>

      <Link href="#" className="list-group-item list-group-item-action">
        {" "}
        All Products
      </Link>

      <a
        href="#"
        className="list-group-item list-group-item-action text-danger"
      >
        {" "}
        Logout
      </a>
    </div>
  );
}

export default AdminSideBar;
