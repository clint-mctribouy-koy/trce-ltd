import SideBar from "./SideBar";

function CustomerOrders({}) {
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
                    <th>Shipping Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <img
                        src="https://th.bing.com/th/id/R.5269bd90d2ef3a130a0ae6f4a4897692?rik=cGkrX9GUTLb6NA&riu=http%3a%2f%2fwww.tshirtfactory.com%2fimages%2fgildan-8000-black.jpg&ehk=fykF8qTla4bb3MghxF4TTSQDZ1KVTuo0YDGyL%2fOOKjk%3d&risl=&pid=ImgRaw&r=0"
                        alt=""
                        className="img-thumbnail"
                        width="80"
                      />
                      <p>Black T-Shirt</p>
                    </td>
                    <td>£12.00</td>
                    <td>21 Albany Park Avenue, EN3 5NT </td>
                    <td>
                      <span className="text-success">
                        <i className="fa fa-check-circle"></i> Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
