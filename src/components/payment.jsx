import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Container,
  Badge,
  Grid,
  Radio,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/router";
import classes from "@/styles/productCard.module.css";
import { addToCart, calculateLoan } from "@/store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Payment({ dataProduct }) {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [selectedValue, setSelectedValue] = React.useState("");
  const handleClick =()=>{
    router.push('/payment')
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    console.log("valueRadio", selectedValue);
    dispatch(calculateLoan(selectedValue));
  }, [selectedValue]);
  const styles = {
    main: {
      backgroundColor: "#F9F9F9",
      borderRadius: "10px 10px 0px 0px",
    },
    header: {
      background: "#E4E4E4",
      borderRadius: "10px 10px 0px 0px",
      padding: 10,
      justifyContent: "center",
      display: "flex",
    },
  };

  return (
    <>
      <Box style={styles.main}>
        <TabContext value={value}>
          <Box style={styles.header}>
            <Box>
              <TabList
                onChange={handleChange}
                indicatorColor="none"
                aria-label="lab API tabs example"
              >
                <Tab
                  label="casch"
                  value="1"
                  sx={{
                    "&.MuiTab-root.Mui-selected": {
                      color: "#fff",
                      backgroundColor: "#6F11E1",
                      borderRadius: "10px",
                    },
                  }}
                />
                <Tab
                  label="Loan"
                  value="2"
                  sx={{
                    "&.MuiTab-root.Mui-selected": {
                      color: "#fff",
                      backgroundColor: "#6F11E1",
                      borderRadius: "10px",
                    },
                  }}
                />
              </TabList>
            </Box>
          </Box>
          <TabPanel value="1">
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total Amount</Typography>
              <Typography>{cart.cartTotalAmount}</Typography>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Stack direction="column">
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={selectedValue || ""}
                  onChange={handleChangeRadio}
                >
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="A"
                      control={<Radio />}
                      label="3-month"
                    />
                    <Typography fontSize={14} color={"#A8A8A8"}>
                      %20 interests
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="B"
                      control={<Radio />}
                      label="6-month"
                    />
                    <Typography fontSize={14} color={"#A8A8A8"}>
                      %10 interests
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="C"
                      control={<Radio />}
                      label="12-month"
                    />
                    <Typography fontSize={14} color={"#A8A8A8"}>
                      %5 interests
                    </Typography>
                  </Box>
                </RadioGroup>
              </FormControl>
            </Stack>
            <Typography my={2}>your firts payment is : {cart.loan}</Typography>
          </TabPanel>
        </TabContext>

        <Box justifyContent="center" display="flex" p={4}>
          <Button onClick={handleClick} variant="contained" sx={{ backgroundColor: "#FD6644" }}>
            Proceed to Check Out
          </Button>
        </Box>
      </Box>
    </>
  );
}
