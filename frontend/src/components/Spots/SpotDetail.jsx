import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import './SpotDetail.css';

function SpotDetail() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  return (
    <div className='page-wrapper'>
      <h1>{spot.name}</h1>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div className='spot-detail-images'>
        <div className='spot-detail-images_main'>
        </div>
        <div className='spot-detail-images_sub'>
        </div>
      </div>
      <div className='spot-detail-info-wrapper'>
        <div className='spot-detail-description'>
          <div>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
          <p>{spot.description}</p>
        </div>
        <div className='spot-detail-callout'>
        </div>
      </div>
    </div>
  );
}

export default SpotDetail;
