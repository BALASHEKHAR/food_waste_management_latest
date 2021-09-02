import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
} from "./types";

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("https://fight-hunger.herokuapp.com/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User

export const register =
  ({ name, email, password, onFail }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        "https://fight-hunger.herokuapp.com/api/users",
        body,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      //   const errors = err.response.data.errors;

      //set alerts
      onFail();

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User

export const login = (email, password, onFail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "https://fight-hunger.herokuapp.com/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //   const errors = err.response.data.errors;

    //set alerts
    onFail();

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout /clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

//update User

export const updateUser = (data, onSuccess) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.put(
      "https://fight-hunger.herokuapp.com/api/auth/update_user",
      data,
      config
    );
    onSuccess();
    dispatch({ type: UPDATE_USER, payload: res.data });
  } catch (err) {
    console.log(err.response.data);
  }
};
