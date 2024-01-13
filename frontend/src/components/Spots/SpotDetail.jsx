import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import './SpotDetail.css';

function SpotDetail() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();

  let mainImage;
  let subImages;
  if (spot && spot.SpotImages) {
    mainImage = spot.SpotImages.find(image => image.preview === true);
    subImages = spot.SpotImages.filter(image => image.preview === false);
  }

  useEffect(() => {
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;
  return (
    <div className='spot-detail-page-wrapper'>
      <h1>{spot.name}</h1>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div className='spot-detail-images-grid-container'>
        <div className='spot-detail-images_main'>
          {mainImage && <img className='sdi-main-image' src={mainImage.url} alt='location photo' />}
        </div>
        <div className='spot-detail-images_sub'>
          {subImages && subImages[0] && <img className='sdi-sub-image' id='sub-img-1' src={subImages[0].url} alt='location photo' />}
          {subImages && subImages[1] && <img className='sdi-sub-image' id='sub-img-2' src={subImages[1].url} alt='location photo' />}
          {subImages && subImages[2] && <img className='sdi-sub-image' id='sub-img-3' src={subImages[2].url} alt='location photo' />}
          {subImages && subImages[3] && <img className='sdi-sub-image' id='sub-img-4' src={subImages[3].url} alt='location photo' />}
        </div>
      </div>
      <div className='spot-detail-info-wrapper'>
        <div className='spot-detail-description'>
          <div>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
          <p>{spot.description}</p>
        </div>
        <div className='spot-detail-callout'>
          <div>${spot.price} night</div>
          <div>
            ★ {isNaN(spot.avgStarRating)
            ? 'New'
            : `${spot.avgStarRating} · ${spot.numReviews} review${spot.numReviews > 1 ? 's' : ''}`}
          </div>
          <button
            type='button'
            onClick={() => alert('Feature Coming Soon...')}
          >
            Reserve
          </button>
        </div>
      </div>
      <hr />
      <div>
        <h2>★ {isNaN(spot.avgStarRating) ? 'New' : spot.avgStarRating} · {spot.numReviews} reviews</h2>
      </div>
    </div>
  );
}

export default SpotDetail;
