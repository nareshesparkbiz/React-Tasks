import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice"
import authUserSlice from "./slices/authUserSlice"
import transactionSlice from "./slices/transactionSlice"



const store=configureStore({
    reducer:{
        users:UserSlice.reducer,
        authUser:authUserSlice.reducer,
        userTransactions:transactionSlice.reducer,
    }

})


export default store;