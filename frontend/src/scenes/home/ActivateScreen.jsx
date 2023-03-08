import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/auth";
const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);

  const { uid, token } = useParams();
  console.log(uid, token);

  const verify_account = (e) => {
    const uid_param = uid;
    const token_param = token;

    verify(uid_param, token_param);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to="/signup/confirmation" replace />;
  }

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
