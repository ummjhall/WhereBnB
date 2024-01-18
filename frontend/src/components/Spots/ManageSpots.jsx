import { useNavigate } from 'react-router-dom'
import './Spots.css';

function ManageSpots() {
  const navigate = useNavigate();




  return (
    <div className="manage-spots-page-wrapper">
      <h1>Manage Spots</h1>
      <div>
        <button
          type='button'
          onClick={() => navigate('/spots/new')}
        >
          Create a New Spot
        </button>
      </div>
    </div>
  );
}

export default ManageSpots;
