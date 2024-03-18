import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>

      {/* PAYMENT METHOD */}
      <Box mt={3}>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Payment Method
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="Cash on Delivery"
          name="cashOnDelivery"
          checked={values.cashOnDelivery}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Payment;

