import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';

function Reviews({ spot }) {
  const spotReviews = useSelector(state => state.reviews);
  const reviewsArray = Object.values(spotReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  return (
    <div>
      ALL YOUR REVIEWS ARE BELONG TO ME
    </div>
  );
}

export default Reviews;
