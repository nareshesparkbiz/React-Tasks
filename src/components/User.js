import { React } from "react";
import { fakeUserData } from "../api/index";
import {
  addUser,
  deleteUser,
  deleteAllUsers,
} from "../redux/stores/slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const User = () => {
  const data = useSelector((state) => {
    return state.users;
  });
  console.log(data, "data");
  const dispatch = useDispatch();

  const incrementUser = () => {
    const fakedata = fakeUserData();
    console.log(fakedata);
    dispatch(addUser(fakedata));
  };

  const decrementUser = (id) => {
    dispatch(deleteUser(id));
  };

  const clearAllUser = () => {
    dispatch(deleteAllUsers());
  };

  const userButtonStyle={
    display: 'flex',

  }

  return (
    <div className="container">
      <h1>List of All Users</h1>
    
      <button onClick={() => incrementUser()}>Add User</button>

      <button onClick={clearAllUser}>Delete All User</button>

      <div className="user-list-data">
        <ul>
          {data.map((element, index) => (
            <div className="user-list" style={userButtonStyle}>
              <li key={index} style={{textTransform:'capitalize'}}>{element}</li>
              <button onClick={() => decrementUser(index)}>Delete User</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
