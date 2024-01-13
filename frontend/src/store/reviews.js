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

  if (res.ok) {
    const reviewsData = await res.json();
    dispatch(loadReviews(reviewsData));
    return res;
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const spotReviews = {};
      action.reviewsData.Reviews.forEach(review => spotReviews[review.id] = review);
      return {...state, ...spotReviews};
    }
    default:
      return state;
  }
};

export default reviewsReducer;
