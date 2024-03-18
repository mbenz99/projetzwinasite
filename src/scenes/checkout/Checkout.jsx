import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { shades } from "../../theme";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cashOnDelivery, setCashOnDelivery] = useState(false); // New state for COD option
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // Copy the billing address onto shipping address if needed
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    // Perform payment based on selected method
    if (isSecondStep) {
      if (cashOnDelivery) {
        // Handle COD payment logic
        // For example, you can display a success message or navigate to a confirmation page
        console.log("Payment successful via Cash on Delivery");
      } else {
        // Handle other payment methods
        makePayment(values);
      }
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    // Implement your payment logic here (e.g., sending payment details to a server)
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
                  cashOnDelivery={cashOnDelivery} // Pass the COD state to Payment component
                  setCashOnDelivery={setCashOnDelivery} // Pass the setter function to toggle COD state
                />
              )}
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
                  onClick={() => setActiveStep(1)} // Update activeStep to 1 (Payment) on "Next" click
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

// Initial form values
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

// Validation schema for each step
const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when(["isSameAddress"], {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when(["isSameAddress"], {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when(["isSameAddress"], {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when(["isSameAddress"], {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when(["isSameAddress"], {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when(["isSameAddress"], {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when(["isSameAddress"], {
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
