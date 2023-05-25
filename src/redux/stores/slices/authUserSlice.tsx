import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { UserType } from '../../../model/type';



  
  
const initialState:UserType[]=[]





const authUserSlice=createSlice({
    name:'authUser',
    initialState,
    reducers:{
        addUser(state,action:PayloadAction<UserType>){
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

export const  {addUser,addToken,removeToken}=authUserSlice.actions
export default authUserSlice;