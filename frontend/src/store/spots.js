import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';

const loadSpots = (spotsData) => {
  return {
    type: LOAD_SPOTS,
    spotsData
  };
};

const loadSpotDetails = (spotData) => {
  return {
    type: LOAD_SPOT_DETAILS,
    spotData
  };
};

export const getAllSpots = () => async dispatch => {
  const res = await csrfFetch(`/api/spots`);

  if (res.ok) {
    const spotsData = await res.json();
    dispatch(loadSpots(spotsData));
    return res;
  }
};

export const getSpotDetails = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotData = await res.json();
    dispatch(loadSpotDetails(spotData));
    return res;
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spots = {};
      action.spotsData.Spots.forEach(spot => {
        spots[spot.id] = spot;
      });
      return {...state, ...spots};
    }
    case LOAD_SPOT_DETAILS:
      return {...state, [action.spotData.id]: action.spotData};
    default:
      return state;
  }
};

export default spotsReducer;
