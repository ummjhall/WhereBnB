import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from './ReviewFormModal';
import ReviewDeleteModal from './ReviewDeleteModal';

function Reviews({ spot }) {
  const spotReviews = useSelector(state => state.reviews[spot.id]?.spotReviews);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const reviewsArray = [];
  let hasPosted = false;
  if (spotReviews) {
    const unorderedReviews = Object.values(spotReviews);
    // Display reviews newest first
    for (let i = unorderedReviews.length - 1; i >= 0; i--) {
      reviewsArray.push(unorderedReviews[i]);
    }
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
        <OpenModalButton
          buttonText='Post Your Review'
          modalComponent={<ReviewFormModal spot={spot} />}
        />)
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
            <div>
              {user.id === review.userId && (
                <div>
                  <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<ReviewDeleteModal review={review} />}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
