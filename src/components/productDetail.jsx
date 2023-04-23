import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import {Box, Stack, Typography, IconButton,Button, Container,
Badge,  
Grid} from '@mui/material';
import { useRouter } from 'next/router'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import classes from  '@/styles/productCard.module.css'
import { addToCart } from '@/store/cartSlice';
import { useSelector, useDispatch } from "react-redux";

export default function ProductDetail({dataProduct}) {
  const router = useRouter()
  const cart = useSelector((state) => state.cart)
  const dispatch= useDispatch();
  const handleClick=()=>{
    dispatch(addToCart(
      dataProduct))
   
    router.push('./cart')
  };
  const styles = {
    main: {
        maxWidth: 900,
        borderRadius: '10px 10px 0px 0px',
    },
    header:{
        background: '#E4E4E4',
        borderRadius: '10px 10px 0px 0px',
        padding:10
    }
};
 
  return (
    <>
    <Box style={styles.main} >
        <Box style={styles.header}>Detail Product</Box>
        <Grid container >
            <Grid item p={2} md={6} xs={12}>
                <Box component='img' p={5} src={dataProduct.image} sx={{objectFit:'cover'}} maxWidth='200px'></Box>
            </Grid>
            <Grid p={1} item md={6} xs={12}>
            <Typography variant='h5' mt={1} gutterBottom  component="div">
        {dataProduct.title}
      </Typography>
      <Box className={`d-flex flex-column mt-0 ${classes.productFeatures}`}>
        <Stack alignItems="center" direction="row" mt={2} spacing={1}>
          <Typography sx={{fontSize:'10px'}} >{dataProduct.description}</Typography>
        </Stack>
        
      </Box>
      <Stack direction='row' mt={3} justifyContent='space-between'  >
        <Typography mt={2} className={classes.price}>{dataProduct.price}$</Typography>

        <Button className={classes.addToCart}  variant='contained' onClick={(e)=>handleClick()}><LocalMallOutlinedIcon/>Add to cart</Button>
      
      </Stack>
            </Grid>
        </Grid>
    </Box>
    
    </>
  )
  }