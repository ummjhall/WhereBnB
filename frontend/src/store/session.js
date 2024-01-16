import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({credential, password})
  });

  const data = await res.json();
  if (res.ok)
    dispatch(setUser(data.user));
  return data;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });

  const data = await res.json();
  if (res.ok)
    dispatch(setUser(data.user));
  return data;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });

  const data = await res.json();
  if (res.ok)
    dispatch(removeUser());
  return data;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');

  const data = await res.json();
  if (res.ok)
    dispatch(setUser(data.user));
  return data;
};

const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user};
    case REMOVE_USER:
      return {...state, user: null};
    default:
      return state;
  }
};

export default sessionReducer;
