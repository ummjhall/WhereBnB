import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import './Reviews.css';

function ReviewDeleteModal({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReview(review.id));
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <div>
        <button
          className='review-delete_confirm'
          type='button'
          onClick={handleDelete}
        >
          Yes (Delete Review)
        </button>
      </div>
      <div>
        <button
          className='review-delete_cancel'
          type='button'
          onClick={closeModal}
        >
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default ReviewDeleteModal;
