import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import './Spots.css';

function Spots() {
  const allSpots = useSelector(state => state.spots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]);

  return (
    <div className='page-wrapper'>
      <h1>This is the home page</h1>
    </div>
  );
}

export default Spots;
