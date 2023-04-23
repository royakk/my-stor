import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Modal,
  Grid,
  TextField,
  Container,
  Button,
} from "@mui/material";
import {
  addToCart,
  increaseCart,
  decreaseCart,
  getTotals,
} from "@/store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Payment from "@/components/payment";

export default function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const [value, setvalue] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  console.log("cart", cart);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 540,
    bgcolor: "#E8FFE4",
    boxShadow: 24,
    borderRadius:5,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const styles = {
    main: {
      background: "#F9F9F9",
      borderRadius: "10px",
    },
    header: {
      background: "#E4E4E4",
      borderRadius: "10px 10px 0px 0px",
      padding: 10,
    },
    typograph: {},
  };

  return (
    <Container maxWidth="sm">
      <Box
        my={3}
        p={3}
        sx={{
          background: "#FFFFFF",
          border: "1px solid #E4E4E4",
          borderRadius: "10px",
        }}
      >
        Total Amount :{cart.cartTotalAmount}
      </Box>
      <Box style={styles.main}>
        <Box style={styles.header}>payments</Box>
        <Grid container padding={5} spacing={2}>
          <Grid item p={2} md={12}>
            <TextField
              fullWidth
              required
              label="Card Number"
              placeholder="123456789123456"
              type="text"
              onChange={(e) => setvalue(e.target.value)}
            />
          </Grid>
          <Grid item p={2} md={12}>
            <TextField
              fullWidth
              required
              label="CVV2"
              type="text"
             
            />
          </Grid>
          <Grid item p={2} md={6}>
            <TextField
              fullWidth
              required
              label="Month"
              type="text"
              
            />
          </Grid>
          <Grid item p={2} md={6}>
            <TextField
              fullWidth
              required
              label=" year"
              type="text"
             
            />
          </Grid>
          <Grid item p={2} md={12}>
            <TextField
              fullWidth
              required
              label="E-Pass"
              type="password"
             
            />
          </Grid>

          <Grid display="flex" justifyContent="center" item p={2} md={6}>
            <Button sx={{ width: "100%" }} variant="outlined">
              cansel
            </Button>
          </Grid>
          <Grid display="flex" justifyContent="center" item p={2} md={6}>
            <Button
              sx={{ backgroundColor: "#FD6644", width: "100%" }}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box px={8} sx={{ ...style, width: 450, textAlign: "center" }}>
          <h2 style={{ color: " #1BAC03" }}>your payment is successful</h2>
          <Stack my={3} direction="row" justifyContent="space-between">
            <Typography>Total Amount:</Typography>
            <Typography>{cart.cartTotalAmount}</Typography>
          </Stack>
          <Stack my={3} direction="row" justifyContent="space-between">
            <Typography>card number:</Typography>
            <Typography>{value}</Typography>
          </Stack>
          <Button
            sx={{ backgroundColor: "#FD6644", width: "100%" }}
            onClick={handleClose}
          >
            Complete transaction{" "}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
