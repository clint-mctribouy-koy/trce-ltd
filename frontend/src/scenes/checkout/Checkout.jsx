import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ApiService from "../../payment_api";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Checkout = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    const requestBody = {
      customer: values.email,
      shipping_address: [
        values.billingAddress.firstName,
        values.billingAddress.lastName,
        values.billingAddress.street1,
        values.billingAddress.city,
        values.billingAddress.country,
        values.billingAddress.zipCode,
      ].join(", "),
      payment_method: paymentMethod.type,
      total_price: totalPrice,
    };

    const response = await fetch("http://localhost:8000/api/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    ApiService.saveStripeInfo({
      email: values.email,
      payment_method_id: paymentMethod.id,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    await navigate(`/checkout/success`);
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      <Box>
        {cart.map((item) => (
          <Box key={`${item.name}-${item.id}`}>
            <FlexBox p="15px 0">
              <Box flex="1 1 40%">
                <img
                  alt={item?.name}
                  width="123px"
                  height="164px"
                  src={`${item?.image}`}
                />
              </Box>
              <Box flex="1 1 60%">
                <FlexBox mb="5px">
                  <Typography fontWeight="bold">{item.name}</Typography>
                </FlexBox>
                <FlexBox m="15px 0">
                  <Typography>QTY: {item.count}</Typography>
                  <Typography fontWeight="bold">${item.price}</Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Box>
        ))}
        <Typography fontWeight="bold">Total Price: ${totalPrice}</Typography>
      </Box>

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <CardElement id="card-element" onChange={handleChange} />
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}

                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    first_name: "",
    last_name: "",
    country: "",
    street_address: "",
    city: "",
    postal_code: "",
  },
  shippingAddress: {
    isSameAddress: true,
    first_name: "",
    last_name: "",
    country: "",
    street_address: "",
    city: "",
    postal_code: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      first_name: yup.string(),
      last_name: yup.string(),
      country: yup.string(),
      street_address: yup.string(),
      city: yup.string(),
      postal_code: yup.string(),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      first_name: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      last_name: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street_address: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      postal_code: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
