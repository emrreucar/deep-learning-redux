import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";
// import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

//! method fetch
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// });

//! method axios
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log("name: ", name);
      // console.log("thunk api: ", thunkAPI);
      // console.log("thunk api get state: ", thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      console.log(error);

      // hard code
      return thunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // actions
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // console.log("Remove Item Action: ", action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        const numericPrice = parseFloat(item.price.replace(",", "."));
        total += item.amount * numericPrice;
      });

      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers: (builder) => {
    // life cycle actions

    //! has been removed
    // [getCartItems.pending]: (state) => {
    //   state.isLoading = true;
    // },

    //! builder notation
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
    });
  },
});

// console.log("cart slice: ", cartSlice);

export default cartSlice.reducer;

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
