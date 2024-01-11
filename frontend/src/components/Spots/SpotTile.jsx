import jh from '../../../../images/jh.jpg';

function SpotTile({ spot }) {
  return (
    <div className='spot-tile tooltip'>
      <span className='tooltip-text'>{spot.name}</span>
      <img className='spot-tile-img' src={jh} />
      <div className='spot-tile_info-span'>
        <span>{spot.city}, {spot.state}</span>
        <span>★ {spot.avgRating}</span>
      </div>
      <div>${spot.price} night</div>
    </div>
  );
}

export default SpotTile;
