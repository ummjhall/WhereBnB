import './ReviewFormModal.css';

function ReviewFormModal() {




  return (
    <div>
      <h1 className='review-form-heading'>How was your stay?</h1>
      <textarea className='review-form-textarea' placeholder='Leave your review here...'/>
      <div className='review-form-star-container'>
        <span className='review-form-star-rating'>
          {`((Insert star thing here))`}
        </span>
        <span>
          Stars
        </span>
      </div>
      <div className='review-form-submit'>
        <button className='review-form-submit_button'>Submit Your Review</button>
      </div>
    </div>
  );
}

export default ReviewFormModal;
