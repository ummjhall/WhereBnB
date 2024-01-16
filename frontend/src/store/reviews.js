import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';

const loadReviews = (reviewsData) => {
  return {
    type: LOAD_REVIEWS,
    reviewsData
  };
};

export const getSpotReviews = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  const reviewsData = await res.json();
  if (res.ok)
    dispatch(loadReviews(reviewsData));
  return reviewsData;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      // SHAPE OF STATE>>> state.reviews: {<<spotId>>: spotReviews: {<<reviewId>>: review}}}
      const spotReviews = {};
      const spotId = action.reviewsData?.Reviews[0]?.spotId;
      action.reviewsData.Reviews.forEach(review => spotReviews[review.id] = review);
      return {...state, [spotId]: {spotReviews: {...spotReviews}}};
    }
    default:
      return state;
  }
};

export default reviewsReducer;
