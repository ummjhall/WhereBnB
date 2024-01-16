import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';
const ADD_SPOT = 'spots/createSpot';
// const ADD_SPOT_IMAGE = 'spots/addSpotImage';

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

// const addSpotImage = (spotImageData) => {
//   return {
//     type: ADD_SPOT_IMAGE,
//     spotImageData
//   };
// };

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

export const createSpot = (spotFormData) => async dispatch => {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify(spotFormData)
  });

  if (res.ok) {
    const spotData = await res.json();
    dispatch(addSpot(spotData));
    return spotData;
  }
};

export const uploadImage = (spotId, formImageData) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(formImageData)
  });

  // const test = await res.json();
  // console.log('*****************');
  // console.log(test);

  // if (res.ok) {
  //   const imageData = await res.json();
  //   dispatch(addSpotImage(imageData));
  //   return res;
  // }
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
      return {...state, [action.spotData.id]: {...state[action.spotData.id], ...action.spotData}};
    case ADD_SPOT:
      return {...state, [action.spotData.id]: action.spotData};
    // case ADD_SPOT_IMAGE: {
    //   let SpotImages;
    // }
    default:
      return state;
  }
};

export default spotsReducer;
