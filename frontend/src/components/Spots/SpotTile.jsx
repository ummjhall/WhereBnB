import { Link } from 'react-router-dom';
import jh from '../../../../images/jh.jpg';
import './Spots.css';


function SpotTile({ spot }) {
  return (
    <Link to={`spots/${spot.id}`} className='spot-tile tooltip'>
      <span className='tooltip-text'>{spot.name}</span>
      <img className='spot-tile-img' src={jh} />
      <div className='spot-tile_info-span'>
        <span>{spot.city}, {spot.state}</span>
        <span>★ {isNaN(spot.avgRating) ? 'New' : spot.avgRating}</span>
      </div>
      <div>
        ${spot.price} night
      </div>
    </Link>
  );
}

export default SpotTile;
