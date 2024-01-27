import { Link, useNavigate } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SpotDeleteModal from './SpotDeleteModal';
import './Spots.css';

function SpotTile({ spot, type }) {
  const navigate = useNavigate();

  const handleUpdateClick = (e) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}/edit`);
  };

  return (
    <div>
      <Link to={`/spots/${spot.id}`} className='spot-tile tooltip'>
        <span className='tooltip-text'>{spot.name}</span>
        <img className='spot-tile-img' src={spot.previewImage} style={{width: '315px', height: '211px'}}/>
        <div className='spot-tile_info-span'>
          <span>{spot.city}, {spot.state}</span>
          <span>★ {!spot.avgRating ? 'New' : spot.avgRating.toFixed(1)}</span>
        </div>
        <div>
          ${spot.price} night
        </div>
      </Link>
      {type === 'manage' && (
        <div className='spot-tile_manage-buttons'>
          <button
            className='manage-spots_button spot-tile_manage-buttons_update'
            type='button'
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button className='manage-spots_button'>
            <OpenModalMenuItem
              itemText='Delete'
              modalComponent={<SpotDeleteModal spotId={spot.id} />}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default SpotTile;
