import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';

const loadSpots = (spotsData) => {
  return {
    type: LOAD_SPOTS,
    payload: spotsData
  };
};

export const getAllSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadSpots(spots));
    return res;
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spots = {};
      action.payload.Spots.forEach(spot => {
        spots[spot.id] = spot;
      });
      return { ...state, ...spots }
    }
    default:
      return state;
  }
};

export default spotsReducer;
