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

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;