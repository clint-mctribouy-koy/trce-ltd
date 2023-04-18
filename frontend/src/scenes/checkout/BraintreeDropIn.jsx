import React, { useEffect, useState } from "react";
import "../../index.css";
import dropin from "braintree-web-drop-in";
import { Button } from "@mui/material";
// import braintree from "braintree-web";
import axios from "axios";

export default function BraintreeDropIn(props) {
  const { show, onPaymentCompleted } = props;

  const [braintreeInstance, setBraintreeInstance] = useState(undefined);

  useEffect(() => {
    if (show) {
      const initializeBraintree = () =>
        dropin.create(
          {
            // insert your tokenization key or client token here
            authorization: "sandbox_8h7wk7nx_cb2sf86qwyjw6cm6",
            container: "#braintree-drop-in-div",
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [show]);

  return (
    <div style={{ display: `${show ? "block" : "none"}` }}>
      <div id={"braintree-drop-in-div"} />

      <Button
        className={"braintreePayButton"}
        type="primary"
        disabled={!braintreeInstance}
        onClick={() => {
          if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod((error, payload) => {
              if (error) {
                console.error(error);
              } else {
                const paymentMethodNonce = payload.nonce;

                // TODO: use the paymentMethodNonce to
                //  call you server and complete the payment here

                // // ...

                // fetch("/payment", {
                //   method: "POST",
                //   headers: { "Content-Type": "application/json" },
                //   body: JSON.stringify(paymentMethodNonce),
                // });

                alert(`Payment completed with nonce=${paymentMethodNonce}`);

                onPaymentCompleted();
              }
            });
          }
        }}
      >
        {"Pay"}
      </Button>
    </div>
  );
}
