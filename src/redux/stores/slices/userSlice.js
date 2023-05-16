import {createSlice} from '@reduxjs/toolkit';


const UserSlice=createSlice({
    name:"user",
    initialState:[],
    reducers:{
        addUser(state,action){
            state.push(action.payload)
            
        },
        deleteUser(state,action){
            state.splice(action.payload,1)

        },
        deleteAllUsers(state,action){
            return [];
        },
    }
}

)
// console.log(UserSlice.actions)

export const {addUser,deleteUser,deleteAllUsers} = UserSlice.actions;
export default UserSlice;

