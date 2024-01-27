import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, getSpotReviews } from '../../store/reviews';
import { getSpotDetails } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './ReviewFormModal.css';

function ReviewFormModal({ spot }) {
  const [ review, setReview ] = useState('');
  const [ rating, setRating ] = useState(0);
  const [ activeRating, setActiveRating ] = useState(rating || 0);
  const [ disabled, setDisabled ] = useState(true);
  const [ serverErrors, setServerErrors ] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rating === 0 || review.length < 10 || review.length > 500)
      setDisabled(true);
    else
      setDisabled(false);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      review,
      stars: rating
    };

    const res = await dispatch(createReview(spot.id, reviewData));
    if (res.message) {
      const errors = res;
      setServerErrors(errors);
      return;
    }
    await dispatch(getSpotReviews(spot.id));
    await dispatch(getSpotDetails(spot.id));
    closeModal();
  };

  return (
    <div>
      <h1 className='review-form-heading'>How was your stay?</h1>
      {serverErrors.message && (<div>{`${serverErrors.message}`}</div>)}
      <form onSubmit={handleSubmit}>
        <textarea
          className='review-form-textarea'
          placeholder='Leave your review here...'
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <div className='review-form-star-container'>
          <span className='review-form-star-rating'>
            <span
              onMouseEnter={() => setActiveRating(1)}
              onMouseLeave={() => setActiveRating(rating)}
              onClick={() => setRating(1)}
              className={activeRating >= 1 ? 'filled' : 'empty'}
            >
              <i className='fa fa-star'></i>
            </span>
            <span
              onMouseEnter={() => setActiveRating(2)}
              onMouseLeave={() => setActiveRating(rating)}
              onClick={() => setRating(2)}
              className={activeRating >= 2 ? 'filled' : 'empty'}
            >
              <i className='fa fa-star'></i>
            </span>
            <span
              onMouseEnter={() => setActiveRating(3)}
              onMouseLeave={() => setActiveRating(rating)}
              onClick={() => setRating(3)}
              className={activeRating >= 3 ? 'filled' : 'empty'}
            >
              <i className='fa fa-star'></i>
            </span>
            <span
              onMouseEnter={() => setActiveRating(4)}
              onMouseLeave={() => setActiveRating(rating)}
              onClick={() => setRating(4)}
              className={activeRating >= 4 ? 'filled' : 'empty'}
            >
              <i className='fa fa-star'></i>
            </span>
            <span
              onMouseEnter={() => setActiveRating(5)}
              onMouseLeave={() => setActiveRating(rating)}
              onClick={() => setRating(5)}
              className={activeRating >= 5 ? 'filled' : 'empty'}
            >
              <i className='fa fa-star'></i>
            </span>
          </span>
          <span>
            Stars
          </span>
        </div>
        <div className='review-form-submit'>
          <button
            className={`review-form-submit_button ${disabled ? '' : 'enabled'}`}
            disabled={disabled}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewFormModal;
