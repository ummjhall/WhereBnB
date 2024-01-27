import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spots';
import SpotTile from './SpotTile';
import './Spots.css';

function ManageSpots() {
  const user = useSelector(state => state.session.user);
  const userSpots = useSelector(state => state.spots);
  const spotsArray = Object.values(userSpots);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);

  return (
    <div className="manage-spots-page-wrapper">
      <h1>Manage Spots</h1>
      <div>
        <button
          className='manage-spots_button manage-spots_create-button'
          type='button'
          onClick={() => navigate('/spots/new')}
        >
          Create a New Spot
        </button>
      </div>
      <div className='spot-tile-wrapper'>
        {user && spotsArray && spotsArray.map(spot => (
          <SpotTile key={spot.id} spot={spot} type='manage'/>
        ))}
      </div>
    </div>
  );
}

export default ManageSpots;
