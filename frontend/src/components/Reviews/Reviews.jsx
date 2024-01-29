import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotReviews } from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewFormModal from './ReviewFormModal';
import ReviewDeleteModal from './ReviewDeleteModal';
import './Reviews.css';

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
        <button className='reviews_button reviews_post-button'>
          <OpenModalMenuItem
            itemText='Post Your Review'
            modalComponent={<ReviewFormModal spot={spot} />}
          />
        </button>)
      }
      {(user && user.id !== spot.Owner.id && !reviewsArray.length) && (
        <div>
          Be the first to post a review!
        </div>)
      }
      <div>
        {reviewsArray && reviewsArray.map(review => (
          <div className='reviews_review' key={review.id}>
            <div className='reviews_review_name'>
              {review.User.firstName}
            </div>
            <div className='reviews_review_date'>
              {`${months[new Date(review.createdAt).getMonth()]} ${review.createdAt.slice(0, 4)}`}
            </div>
            <div className='reviews_review_message'>
              {review.review}
            </div>
            <div>
              {user && user.id === review.userId && (
                <div>
                  <button className='reviews_button'>
                    <OpenModalMenuItem
                      itemText='Delete'
                      modalComponent={<ReviewDeleteModal review={review} spotId={spot.id} />}
                    />
                  </button>
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
