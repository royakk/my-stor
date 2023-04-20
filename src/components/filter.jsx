import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import {Box, Stack, Typography, IconButton,Button, Container,
Badge  } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { ascSort } from '@/store/productSlice';
import { useSelector, useDispatch } from "react-redux";

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
function Filter({data}) {
  const dispatch= useDispatch();

  const hanldleClick = () => {
    dispatch(ascSort());
    console.log('dispatch ascsort')
  };
 
  return (
    <>
    <Stack direction='row' spacing={2} alignContent='center'>
        <Typography>Sorting </Typography>
        <SortIcon/>
        <Button onClick={hanldleClick}>Ascending</Button>
        <Button>Descending</Button>
    </Stack>
    </>
        
  );
}

export default Filter;