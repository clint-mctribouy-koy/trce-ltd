import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="list-group">
      <Link
        to="/customer/dashboard"
        className="list-group-item list-group-item-action"
      >
        {" "}
        Dashboard
      </Link>
      <Link
        to="/customer/orders"
        className="list-group-item list-group-item-action"
      >
        {" "}
        Orders
      </Link>
      <Link href="#" className="list-group-item list-group-item-action">
        {" "}
        WishList
      </Link>
      <Link href="#" className="list-group-item list-group-item-action">
        {" "}
        Profile
      </Link>
      <Link href="#" className="list-group-item list-group-item-action">
        {" "}
        Registered Addresses
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

export default SideBar;
