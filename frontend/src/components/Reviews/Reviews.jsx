import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';

function Reviews({ spot }) {
  const spotReviews = useSelector(state => state.reviews[spot.id]?.spotReviews);
  let reviewsArray;
  if (spotReviews) reviewsArray = Object.values(spotReviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  if (!spotReviews) return;

  return (
    <div>
      <div>
        {reviewsArray && reviewsArray.map(review => (
          <div key={review.id}>
            <div>{review.User.firstName}</div>
            <div>{review.createdAt}</div>
            <div>{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
