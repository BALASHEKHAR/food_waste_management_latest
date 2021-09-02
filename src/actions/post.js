import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_POST,
} from "./types";

//get posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("https://fight-hunger.herokuapp.com/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add like

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://fight-hunger.herokuapp.com/api/posts/like/${id}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//unlike

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://fight-hunger.herokuapp.com/api/posts/unlike/${id}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete post

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://fight-hunger.herokuapp.com/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add a post

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { country, city, address, images } = formData;
    let imgUrls = [];
    //getting url links and getting the lat and lon  of address
    images.map(async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "SocialMedia");
      data.append("cloud_name", "djqrcbjmu");
      const data1 = await fetch(
        "	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const data2 = await data1.json();
      const url = await data2.secure_url;
      imgUrls.push(url);
    });
    formData["images"] = imgUrls;
    const fulladdress = country + "," + city + "," + address;
    const getLatLangFromAddress = await axios.get(
      `https://www.mapquestapi.com/geocoding/v1/address?key=iIzTGMTjj6hWGGvsPSShyeDxyifWFnpL&location=${fulladdress}`
    );
    const latLng = getLatLangFromAddress.data.results[0].locations[0].latLng;
    const lat = latLng.lat.toString();
    const lng = latLng.lng.toString();
    formData["lat"] = lat;
    formData["lon"] = lng;
    const res = await axios.post(
      "https://fight-hunger.herokuapp.com/api/posts",
      formData,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update post

export const updatePost = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { country, city, address, images } = formData;
    let imgUrls = [];
    //getting url links and getting the lat and lon  of address
    images.map(async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "SocialMedia");
      data.append("cloud_name", "djqrcbjmu");
      const data1 = await fetch(
        "	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const data2 = await data1.json();
      const url = await data2.secure_url;
      imgUrls.push(url);
    });
    formData["images"] = imgUrls;
    const fulladdress = country + "," + city + "," + address;
    const getLatLangFromAddress = await axios.get(
      `https://www.mapquestapi.com/geocoding/v1/address?key=iIzTGMTjj6hWGGvsPSShyeDxyifWFnpL&location=${fulladdress}`
    );
    const latLng = getLatLangFromAddress.data.results[0].locations[0].latLng;
    const lat = latLng.lat.toString();
    const lng = latLng.lng.toString();
    formData["lat"] = lat;
    formData["lon"] = lng;
    const res = await axios.put(
      `https://fight-hunger.herokuapp.com/api/posts/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_POST,
      payload: { id, data: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get post

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://fight-hunger.herokuapp.com/api/posts/${id}`
    );
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
