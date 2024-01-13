import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotTile from './SpotTile';
import './Spots.css';

function Spots() {
  const allSpots = useSelector(state => state.spots);
  const spotsArray = Object.values(allSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className='page-wrapper'>
      <div className='spot-tile-wrapper'>
        {spotsArray.map(spot => (
          <SpotTile key={spot.id} spot={spot}/>
        ))}
      </div>
    </div>
  );
}

export default Spots;
