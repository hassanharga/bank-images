import { Dispatch as ReduxDispatch, Action } from 'redux';

export type Dispatch = ReduxDispatch<Action<string>>;
