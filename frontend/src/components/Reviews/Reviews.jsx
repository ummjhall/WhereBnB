import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';

function Reviews({ spot }) {
  const spotReviews = useSelector(state => state.reviews[spot.id]?.spotReviews);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let reviewsArray;
  let hasPosted = false;
  if (spotReviews) {
    reviewsArray = Object.values(spotReviews);
    reviewsArray.forEach(review => {
      if (user && user.id === review.userId) hasPosted = true;
    });
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    dispatch(getSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  return (
    <div>
      {(user && !hasPosted && user.id !== spot.Owner.id) && (
        <button type='button'>Post Your Review</button>)
      }
      {(user && user.id !== spot.Owner.id && !reviewsArray) && (
        <div>
          Be the first to post a review!
        </div>)
      }
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
  );
}

export default Reviews;
