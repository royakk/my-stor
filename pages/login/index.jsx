import React from 'react';
import { Box, Stack, Container,Grid} from '@mui/material';
import LoginForm from '@/PAGES/login';

export default function LoginPage()  {
    
    return (
       <Grid container >
            <Grid  item md={6}>
                <Box component="img" src="/Group1.jpg" alignItems='center'/>
            </Grid>
            <Grid  item md={6}>
                <LoginForm/>
            </Grid>
       </Grid>
    );
}


