import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  const URL="https://fakestoreapi.com";

  const AllPRO_URL = `${URL}/products`;
  const AscSort_URL = `${URL}/products`;
  const CREATE_URL = `${URL}/productCategorization/1.0/create_category`;
  const FILTER_URL = `${URL}/products/category`;

  const selectAdapter = createEntityAdapter();

  const initialState = selectAdapter.getInitialState({
    value:[],
    
})

export const fetchAllProduct = createAsyncThunk("products/fetchAllProduct", async () => {
    
  const response = await axios.get(AllPRO_URL);
  console.log("AllProductrrrr", response);
  return response.data
});
//-------------------------------------------------------------------------------------
export const ascSort = createAsyncThunk("products/ascSort", async () => {
    
  const response = await axios.post(AscSort_URL,{params:{sort:'desc'}});
  console.log("ascccc", response);
  return response.data
});
//---------------------------------------------------------------------------------------
// export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    
//   const response = await axios.post(CREATE_URL,data);
//   console.log("createeee", response);
//   if (response?.status === 200) return data;
//   return `${response?.status}: ${response?.statusText}`;
// });
//-----------------------------------------------------------------------------------
export const filterProduct = createAsyncThunk("products/filterProduct", async (data) => {
    
  const response = await axios.get(`https://fakestoreapi.com/products/category/${data}`);
  console.log("filterrr", response.data);
  return response.data;
  return `${response?.status}: ${response?.statusText}`;
});


const productSlice = createSlice({
  name: "products",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
          const AllinProducts = action.payload;
        console.log("AllProduct",AllinProducts)
        selectAdapter.addOne(state, AllinProducts);

      })
      .addCase(ascSort.fulfilled, (state, action) => {
          const ascProducts = action.payload;
        console.log("ascProducts",ascProducts)
        selectAdapter.addOne(state, ascProducts);

      })
      .addCase(filterProduct.fulfilled, (state, action) => {
          const productsFilter = action.payload;
        console.log("productsFilter",productsFilter);
        selectAdapter.removeAll(state);
        selectAdapter.addOne(state, productsFilter);

      })
      
      // .addCase(addProduct.fulfilled, (state, action) => {
      //   const productAdd = action.payload;
      //   console.log(action.payload);
      //   postsAdapter.addOne(state, productAdd);

      // })

  },
});
export const {
  selectAll: AllProducts,
  selectById: selectProductById,
  selectEntities:selectFilteredProducts,
  selectIds: selectProductIds,
} = selectAdapter.getSelectors((state) => state.products);


export default productSlice.reducer;
