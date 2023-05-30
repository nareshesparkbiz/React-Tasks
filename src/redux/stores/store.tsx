import { configureStore } from "@reduxjs/toolkit";

import authUserSlice from "./slices/authUserSlice"
import transactionSlice from "./slices/transactionSlice"
import languageSelectionSlice from "./slices/languageSelection"
import selectedlangSlice from "./slices/selectedLang"



const store=configureStore({
    reducer:{
    
        authUser:authUserSlice.reducer,
        userTransactions:transactionSlice.reducer,
        languageSelection:languageSelectionSlice.reducer,
        langSelected:selectedlangSlice.reducer,
        

    }

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;