import {
  LOGIN,
  REGISTER,
  STOP_LOADING,
  START_LOADING,
  SET_IMAGES,
  DELETE_IMAGE,
  EDIT_IMAGE,
  ADD_IMAGE,
} from '../actions/actionTypes';

export type AuthStateType = {
  user: {
    _id: string;
    email: string;
  } | null;
  isLoading: boolean;
  images: {
    tags: string[];
    url: string;
    _id: string;
    userId: string;
  }[];
};

const initialState: AuthStateType = {
  user: null,
  isLoading: false,
  images: [],
};

export default function auth(state = initialState, action: any): AuthStateType {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case SET_IMAGES:
      return { ...state, images: [...action.payload] };
    case ADD_IMAGE:
      return { ...state, images: [...state.images, action.payload] };
    case DELETE_IMAGE:
      const allImgs = [...state.images];
      const imgIdx = allImgs.findIndex((img) => img._id === action.payload._id);
      if (imgIdx >= 0) {
        allImgs.splice(imgIdx, 1);
      }
      return { ...state, images: [...allImgs] };
    case EDIT_IMAGE:
      const allImges = [...state.images];
      const imgIdxx = allImges.findIndex(
        (img) => img._id === action.payload._id
      );
      if (imgIdxx >= 0) {
        allImges[imgIdxx] = { ...action.payload };
      }
      return { ...state, images: [...allImges] };
    case LOGIN:
      return {
        ...state,
        user: { ...action.payload },
        isLoading: false,
      };
    case REGISTER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
