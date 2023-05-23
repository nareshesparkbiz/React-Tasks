import {createSlice,PayloadAction} from '@reduxjs/toolkit';

const initialState: any[] =[]

const UserSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser(state,action:PayloadAction<any>){
            state.push(action.payload)
            
        },
        deleteUser(state,action:PayloadAction<any>){
            state.splice(action.payload,1)

        },
        deleteAllUsers(state,action:PayloadAction<string>){
            return [];
        },
    }
}

)
// console.log(UserSlice.actions)

export const {addUser,deleteUser,deleteAllUsers} = UserSlice.actions;
export default UserSlice;

