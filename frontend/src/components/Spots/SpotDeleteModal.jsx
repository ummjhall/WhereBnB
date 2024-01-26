import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import './Spots.css';

function SpotDeleteModal({ spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    // Cleanup: Just dispatch this, get rid of async
    const res = await dispatch(deleteSpot(spotId));
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot?</h2>
      <div>
        <button
          className='spot-delete_confirm'
          type='button'
          onClick={handleDelete}
        >
          Yes (Delete Spot)
        </button>
      </div>
      <div>
        <button
          className='spot-delete_cancel'
          type='button'
          onClick={closeModal}
        >
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}

export default SpotDeleteModal;
