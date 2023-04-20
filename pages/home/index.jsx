import React, { useState, useEffect, useCallback } from 'react';
import { Box, Stack, Container,Grid} from '@mui/material';
import Layout from '../../src/components/layout';
import { useSelector, useDispatch } from "react-redux";
import { AllProducts ,fetchAllProduct,selectFilteredProducts} from '@/store/productSlice';
import ProductCard from '@/components/productmui';
import Filter from '@/components/filter';

export default function HomePage()  {
    const dispatch= useDispatch();
   
    useEffect(() => {
        dispatch(fetchAllProduct());
         }, []);
    
    const allProducts =  useSelector((state) => AllProducts(state))[0];

    return (
     
       <Grid container spacing={2} >
            <Grid  item xs={10} md={12}>
                <Box component="img" sx={{objectFit:'contain'}} src="/banner.png" />
            </Grid>
            
            <Grid  item xs={12} md={12}>
                <Filter/>
            </Grid>
             
            { allProducts?.map((item,index)=>(
            
              <Grid my={1} item md={3}  xs={6}>
                <ProductCard dataProduct={item} />
              </Grid>
            )) }
            
       </Grid>
       
    );
}
HomePage.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }

