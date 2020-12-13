import { Dispatch } from './types';
import axios from '../../services/axios';
import {
  LOGIN,
  REGISTER,
  SET_IMAGES,
  DELETE_IMAGE,
  EDIT_IMAGE,
  ADD_IMAGE,
} from './actionTypes';

export const login = (email: string, password: string, history: any) => async (
  dispatch: Dispatch
) => {
  try {
    const {
      data: { user, token },
    } = await axios.post('/user/login', {
      email,
      password,
    });
    console.log('user', user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: LOGIN, payload: user });
    history.push('/');
  } catch (error) {
    console.error('error[login]', error.response);
    alert(error.response.data.msg);
  }
};

export const register = (
  email: string,
  password: string,
  history: any
) => async (dispatch: Dispatch) => {
  try {
    const {
      data: { user, token },
    } = await axios.post('/user/', {
      email,
      password,
    });
    // console.log('user', user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: REGISTER, payload: user });
    history.push('/');
  } catch (error) {
    console.error('error[register]', error.response);
    alert(error.response.data.msg);
  }
};

export const searchImages = (tagName: string) => async (dispatch: Dispatch) => {
  try {
    const {
      data: { images },
    } = await axios.get('/image/?tagName=' + tagName);
    // console.log('images', images);

    dispatch({ type: SET_IMAGES, payload: images });
  } catch (error) {
    console.error('error[searchImages]', error.response);
    alert(error.response.data.msg);
  }
};

export const addImage = (url: string, tags: string[] = []) => async (
  dispatch: Dispatch
) => {
  try {
    const {
      data: { image },
    } = await axios.post('/image/', {
      url,
      tags,
    });
    console.log('image', image);

    dispatch({ type: ADD_IMAGE, payload: image });
  } catch (error) {
    console.error('error[searchImages]', error.response);
    alert(error.response.data.msg);
  }
};

export const editImageTags = (_id: string, tagName: string) => async (
  dispatch: Dispatch
) => {
  try {
    const {
      data: { image },
    } = await axios.put('/image/', {
      _id,
      tags: tagName.split(' '),
    });
    console.log('image', image);

    dispatch({ type: EDIT_IMAGE, payload: image });
  } catch (error) {
    console.error('error[editImageTags]', error.response);
    alert(error.response.data.msg);
  }
};

export const deleteImg = (_id: string) => async (dispatch: Dispatch) => {
  try {
    const {
      data: { image },
    } = await axios.delete('/image/', { data: { _id } });
    console.log('deleteImg', image);

    dispatch({ type: DELETE_IMAGE, payload: image });
  } catch (error) {
    console.error('error[searchImages]', error.response);
    alert(error.response.data.msg);
  }
};

export const getAllImages = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: { images },
    } = await axios.get('/image/');
    console.log('images', images);

    dispatch({ type: SET_IMAGES, payload: images });
  } catch (error) {
    console.error('error[searchImages]', error.response);
    // alert(error.response.data.msg);
  }
};
