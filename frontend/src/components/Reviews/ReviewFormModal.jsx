import { useEffect, useState } from 'react';
import './ReviewFormModal.css';

function ReviewFormModal() {
  const [ review, setReview ] = useState('');
  const [ rating, setRating ] = useState(0);
  const [ activeRating, setActiveRating ] = useState(rating || 0);
  const [ disabled, setDisabled ] = useState(true);

  useEffect(() => {
    if (rating === 0 || review.length < 10)
      setDisabled(true);
    else
      setDisabled(false);
  }, [rating, review]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className='review-form-heading'>How was your stay?</h1>
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
            className='review-form-submit_button'
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
