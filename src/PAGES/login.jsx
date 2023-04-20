import React, { useState, useEffect, useCallback } from 'react'
import { InputAdornment, Box, Stack, Typography, IconButton, SvgIcon, TextField, Snackbar,Button,Alert, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form } from 'formik';
import Services from '../services/login'
import { useRouter } from 'next/router';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import styles from '@/styles/login.module.css';
import { setToken } from '@/store/isLogin';
import { useDispatch } from 'react-redux';


export default function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleOpenError = (text) => {
        setErrorText(text);
        setError(true);
      };
    
      const handleCloseError = () => {
        setError(false);
      };
    return (
        <Container sx={{justifyContent:"center",display:'grid'}}>
        <Stack direction='row' justifyContent='center'  sx={{alignItems: 'center' }} spacing={2} my={3}> 
        <Box component="img" src="/Group2.jpg" alignItems='center'/>
        <Box component="img" src="/echoshop.jpg" alignItems='center'/>
        </Stack>   
        <Typography className={styles.wlc}>Welcom Back</Typography> 
        <Stack  textAlign= 'center' sx={{maxWidth:'500px'}} py={3}>
        <Typography className={styles.lorem}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, molestiae beatae obcaecati enim sed libero saepe possimus repellendus suscipit! Maiores veniam ratione culpa reprehenderit voluptatibus labore ipsam minus amet reiciendis!</Typography>
         </Stack>
        
        <Box sx={{ paddingX: 0 ,marginTop:'1rem' }}>
        <div style={{ direction: "rtl" }}>
          
          <Snackbar
            open={error}
            autoHideDuration={4000}
            onClose={handleCloseError}
            sx={{ direction: "right" }}
          >
            <Alert
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorText}
            </Alert>
          </Snackbar>
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          
          onSubmit={async (values) => {
            try{
            
            const response= await Services.Login(values)
           dispatch(setToken(response.data.token)) ;
            // response.data.token && router.push('/dashboard')
           
            }
            catch (error){
              setHasError(true);
             handleOpenError("username or password incorrect!")
            }
          }}
        >
          {(propsFormik) => (

         
         <Form onSubmit={propsFormik.handleSubmit} >
              <Stack spacing={3} >
                <TextField
                  required
                  label="User Name"
                  name="username"
                  placeholder="User Name"
                  type="text"
                  onChange={propsFormik.handleChange}
                  value={propsFormik.values.username}
                  InputProps={
                    {
                        startAdornment: (<InputAdornment position="start"> <PersonOutlineIcon /> </InputAdornment>),
                      
                    }
                }
                />
                <TextField
                  required
                  label="password"
                  name="password"
                  placeholder="Password"
                  icon={<LockIcon />}
                  onChange={propsFormik.handleChange}
                  value={propsFormik.values.password}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={
                    {
                       
                        startAdornment: (<InputAdornment position="start"> <LockIcon /> </InputAdornment>),
                        endAdornment: (<InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
    
    
                    }
                }
                  />
  
              </Stack>
                <Stack justifyContent='center'  sx={{alignItems: 'center' }} mt={8}>
                <Button  type="submit" variant='contained' className={styles.btnlogin} >Login</Button>
                </Stack>
            </Form>
          )}
        </Formik>
        
      </Box>
      </Container>
 
    );
}

