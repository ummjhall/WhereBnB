import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';

const loadReviews = (reviewsData) => {
  return {
    type: LOAD_REVIEWS,
    reviewsData
  };
};

const addReview = (reviewData) => {
  return {
    type: ADD_REVIEW,
    reviewData
  };
};

export const getSpotReviews = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  const reviews = await res.json();
  if (res.ok)
    dispatch(loadReviews(reviews));
  return reviews;
};

export const createReview = (spotId, reviewData) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });

  const review = await res.json();
  if(res.ok)
    dispatch(addReview(review))
  return review;
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
