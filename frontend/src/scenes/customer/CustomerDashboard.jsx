import SideBar from "./SideBar";
function Dashboard({ isAuthenticated }) {
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
                    <a href="#">1</a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4> Wishlist</h4>
                  <h4>
                    <a href="#">1</a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4> Addresses</h4>
                  <h4>
                    <a href="#">1</a>
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

export default Dashboard;
