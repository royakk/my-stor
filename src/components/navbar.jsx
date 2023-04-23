import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import {Box, Stack, Typography, IconButton,Button, Container,
Badge  } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import { filterProduct } from '@/store/productSlice';
import { useSelector, useDispatch } from "react-redux";

function Navbar({data}) {
  const [allcat, setAllcat] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch= useDispatch();
  const { cartTotalQuantity} = useSelector((store) => store.cart)

  const hanldleClick = (event,page) => {
    dispatch(filterProduct(page))
    console.log("navbarclick");;

  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  async function getCat(){
    try {
    const result = await axios.get('https://fakestoreapi.com/products/categories');
    const data = result.data
    setAllcat(data);
    console.log("alllCat",result)}
    catch(error){
      console.log("errror",error);
    }
  }
  useEffect(() => {
   getCat();
  }, []);
  return (
    <AppBar sx={{backgroundColor:'#fff',color:'black',zIndex:999}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Stack direction='row' justifyContent='center'  sx={{alignItems: 'center' }} spacing={2} > 
        <Box component="img" src="/Group2.jpg" alignItems='center'/>
        <Box component="img" src="/echoshop.jpg" alignItems='center'/>
        </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {allcat.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1,marginLeft:'2rem', display: { xs: 'none', md: 'flex' } }}>
            {allcat.map((page) => (
              <Button
                key={page}
                onClick={(e)=>hanldleClick(e,page)}
                sx={{ my: 1, color: 'black',textTransform:'none',fontSize:'16px', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            
         
          <Badge badgeContent={cartTotalQuantity} color="error">
          
        <Button sx={{backgroundColor: '#6F11E1',borderRadius:'5px',minWidth:'14px',color:'#fff'}} size="large" aria-label="show 4 new mails" color="inherit">
        <MailIcon/> </Button></Badge>

        
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
// export const getServerSideProps = async ({
 
//   res
// }) => {
//   try {
    
//     const result = await axios.get('https://fakestoreapi.com/products/categories');
//     const data = await result.json();
//     console.log("alllCat",data);
//     return {
//       props: { data }
//     };
//   } 
//   catch {
//     // res.statusCode = 404;
//    console.log("errror");
//   }
// };
export default Navbar;