import React, { useState, useEffect, useRef } from 'react'
import { CardActionArea, CardActions, Box, Stack, Rating,Button,Typography,
CardMedia,CardContent,Card, Chip} from '@mui/material';
import classes from  '@/styles/productCard.module.css'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { selectProductById,selectProductIds} from '@/store/productSlice';
import axios from 'axios';
import ProductDetail from './productDetail';
import AlertDialog from './base/dialog';

const styles = {
  cardMedia: {
    aspectRatio: 135 / 76,
  }
}

export default function ProductCard({dataProduct}) {
  
  const router = useRouter();
  const [id,setId] =  useState();
  const [open,setOpen] =  useState(false);
  const [detail,setDetail] =  useState();
  const [cardHeight, setCardHeight] = useState('auto');
  const refCard = useRef(null);
  const productById =  useSelector((state) => selectProductById(state,id));
    const handlePreview = async(id) => {
    setId(id);
    const response= await axios.get(`https://fakestoreapi.com/products/${id}`)
    const data= response.data;
    setDetail(data)
    setOpen(true);
  
  }
  useEffect(() => {
    setCardHeight(refCard.current.clientHeight - 23);
  },[]);
  return (
    <>
    <Card className={classes.card}>
      <CardActionArea onClick={handlePreview}>
        <CardMedia
          component="img"
          height="auto"
          style={styles.cardMedia}
          image={dataProduct.image}
          
        />
      </CardActionArea>
      <CardContent mx={0} ref={refCard} className={classes.cardContent} sx={{height: cardHeight}}>
      <Stack direction='row' justifyContent='space-between' >
      <Chip label={dataProduct.category} sx={{backgroundColor:'#F74528',color:'#fff'}}/>
      <Rating name="read-only" value={dataProduct.rating.rate} readOnly />
      </Stack>
      <Typography className={classes.header} mt={1} gutterBottom variant="h5" component="div">
        {dataProduct.title}
      </Typography>
      <Box className={`d-flex flex-column mt-0 ${classes.productFeatures}`}>
        <Stack alignItems="center" direction="row" mt={2} spacing={1}>
          <Typography className={classes.subTitle}>{dataProduct.description}</Typography>
        </Stack>
        
      </Box>
      <Stack direction='row' justifyContent='space-between'>
        <Typography mt={2} className={classes.price}>{dataProduct.price}$</Typography>
        <CardActions>

        <Button className={classes.addToCart}  variant='contained' onClick={(e)=>handlePreview(dataProduct.id)}><LocalMallOutlinedIcon/></Button>
        
      </CardActions>
      </Stack>
      
     
    </CardContent>
    </Card >
    <AlertDialog isOpen={open}>
    <ProductDetail dataProduct={detail}/>
    </AlertDialog>
    </>
  );

}