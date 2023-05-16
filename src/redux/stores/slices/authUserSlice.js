import {createSlice} from '@reduxjs/toolkit';

const authUserSlice=createSlice({
    name:'authUser',
    initialState:[],
    reducers:{
        addUser(state,action){
            state.push(action.payload)
            
        },
        addToken(state,action){
            return state=action.payload;
        },
        removeToken(state,action){
            return state=action.payload
        },

    }
})
// console.log(authUserSlice.actions)
export const  {addUser,addToken,removeToken}=authUserSlice.actions
export default authUserSlice;