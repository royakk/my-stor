import React, { useState, useEffect } from 'react'
import {  Box, Stack, Typography, IconButton, Grid } from '@mui/material';
import { addToCart,
    increaseCart,
    decreaseCart,
    getTotals,
    } from '@/store/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Payment from '@/components/payment';

export default function CartTable() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
   
    console.log("cart",cart);
    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]);
      
      const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
      };
      const handleIncreaseCart = (product) => {
        dispatch(increaseCart(product));
      };
     
    const styles = {
        main: {
            background:'#F9F9F9',
            borderRadius: '10px 10px 0px 0px',
        },
        header:{
            background: '#E4E4E4',
            borderRadius: '10px 10px 0px 0px',
            padding:10
        }
    };
    return (
        <Grid container p={2} spacing={2}>
        <Grid item md={8}>
        <Box style={styles.main} >
        <Box style={styles.header}>
        <Grid container  textAlign='center'   alignItems='center' >
            <Grid   item p={2} md={4}sm={3}>
               <Typography>producy Detail</Typography>
            </Grid>
            <Grid item p={2} md={4}sm={3}>
               <Typography> title</Typography>
            </Grid>
            <Grid item p={2} md={2}sm={3}>
               <Typography> price</Typography>
            </Grid>
            <Grid item p={2} md={2}sm={3}>
               <Typography> total</Typography>
            </Grid>
            </Grid>
        </Box>
            {cart.cartItems.map((cartItem)=>(<Grid key={cartItem.id} container  textAlign='center'  alignItems='center'  >
            <Grid direction='column'  item p={2} md={4}  sm={3}>
                <Stack alignItems='center'>
                <Box component='img' width={100} height={100} src={cartItem.image} />
                 <Stack direction='row' alignItems='center' spacing={1}>
                 <IconButton onClick={() => handleDecreaseCart(cartItem)}><RemoveCircleOutlineIcon/></IconButton>
                <Typography >{cart.cartTotalQuantity}</Typography>
                <IconButton onClick={() => handleIncreaseCart(cartItem)}><AddCircleOutlineIcon/></IconButton>
                </Stack>
                </Stack>
            </Grid>
            <Grid item p={2} md={4}  sm={3}>
               <Typography>{cartItem.title} </Typography>
            </Grid>
            <Grid item p={2} md={2}  sm={3}>
               <Typography> {cartItem.price}</Typography>
            </Grid>
            <Grid item p={2} md={2}  sm={3}>
               <Typography>${cartItem.price * cartItem.cartQuantity}</Typography>
            </Grid>
            </Grid>
        ))}
          
    </Box>
    </Grid>
    <Grid item md={4}>
        <Payment/>
    </Grid>
    </Grid>
    );
}

