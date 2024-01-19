import { Link } from 'react-router-dom';
import './Spots.css';

function SpotTile({ spot }) {
  return (
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
  );
}

export default SpotTile;
