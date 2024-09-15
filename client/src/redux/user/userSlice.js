// import { createSlice } from "@reduxjs/toolkit";

// const initialState={
//     currentUser:null,
//     error:null,
//     loading:false,

// };

// const userSlice=createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         signInStart:(state)=>{
//             state.loading=true
//         },
//         signInSuccess:(state,action)=>{
//             state.currentUser=action.payload;
//             state.loading=false;
//             state.error=null
//         },
//         signinFailure:(state,action)=>{
//             state.error=action.payload;
//             state.loading=false;

//         }
//     }
// });


// export const {signInStart,signInSuccess,signInFailure} =userSlice.actions;
// export const userReducer = userSlice.reducer;





import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    userData: null,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export const userReducer = userSlice.reducer;
