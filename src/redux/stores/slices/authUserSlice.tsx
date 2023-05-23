import {createSlice,PayloadAction} from '@reduxjs/toolkit';



  
  
// Define the initial state using that type
 
// type SliceState = {
    
//       id: string;
//       user: {
//         name: string;
//         email: string;
//         password: string;
//         respassword: string;
//       };
//       token?: string;
    
//     }[];


// const initialState: any[] =[]
const initialState:any[]=[]





const authUserSlice=createSlice({
    name:'authUser',
    initialState,
    reducers:{
        addUser(state,action:PayloadAction<any>){
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