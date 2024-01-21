import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';
const ADD_SPOT = 'spots/createSpot';

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

const addSpot = (spotData) => {
  return {
    type: ADD_SPOT,
    spotData
  };
};

export const getAllSpots = () => async dispatch => {
  const res = await csrfFetch(`/api/spots`);

  const spotsData = await res.json();
  if (res.ok)
    dispatch(loadSpots(spotsData));
  return spotsData;
};

export const getUserSpots = () => async dispatch => {
  const res = await csrfFetch(`/api/spots/current`);

  const spotsData = await res.json();
  if (res.ok)
    dispatch(loadSpots(spotsData));
  return spotsData;
}

export const getSpotDetails = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  const spotData = await res.json();
  if (res.ok)
    dispatch(loadSpotDetails(spotData));
  return spotData;
};

export const createSpot = (spotFormData) => async dispatch => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify(spotFormData)
  });

  const spotData = await res.json();
  if (res.ok)
    dispatch(addSpot(spotData));
  return spotData;
};

export const updateSpot = (spotId, spotFormData) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spotFormData)
  });

  const spotData = await res.json();
  if (res.ok)
    dispatch(addSpot(spotData));
  return spotData;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spots = {};
      action.spotsData.Spots.forEach(spot => {
        spots[spot.id] = spot;
      });
      return {...spots};
    }
    case LOAD_SPOT_DETAILS:
      return {...state, [action.spotData.id]: {...state[action.spotData.id], ...action.spotData}};
    case ADD_SPOT:
      return {...state, [action.spotData.id]: action.spotData};
    default:
      return state;
  }
};

export default spotsReducer;
