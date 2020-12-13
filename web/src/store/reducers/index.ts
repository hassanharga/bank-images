import { combineReducers } from 'redux';
import images from './images.reducer';

const rootReducer = combineReducers({
  images,
});

export default rootReducer;

export type rootState = ReturnType<typeof rootReducer>;
