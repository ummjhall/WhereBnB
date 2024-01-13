import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';

function Reviews({ spot }) {
  const spotReviews = useSelector(state => state.reviews[spot.id]?.spotReviews);
  const user = useSelector(state => state.session.user);
  let reviewsArray;
  if (spotReviews) reviewsArray = Object.values(spotReviews);
  const dispatch = useDispatch();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    dispatch(getSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  return spotReviews ? (
    <div>
      <div>
        {reviewsArray && reviewsArray.map(review => (
          <div key={review.id}>
            <div>
              {review.User.firstName}
            </div>
            <div>
              {`${months[new Date(review.createdAt).getMonth()]} ${review.createdAt.slice(0, 4)}`}
            </div>
            <div>
              {review.review}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : user && user.id !== spot.Owner.id ? (
    <div>
      Be the first to post a review!
    </div>
  ) : null;
}

export default Reviews;
