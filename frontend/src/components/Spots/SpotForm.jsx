import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpot, uploadImage } from '../../store/spots';
import './SpotForm.css';
import { csrfFetch } from '../../store/csrf';

function SpotForm() {
  const [ country, setCountry ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ previewImage, setPreviewImage ] = useState('');
  const [ image2, setImage2 ] = useState('');
  const [ image3, setImage3 ] = useState('');
  const [ image4, setImage4 ] = useState('');
  const [ image5, setImage5 ] = useState('');
  const [ validationErrors, setValidationErrors ] = useState({});
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const errors = {};

    if (!country.length)
      errors.country = 'Country is required';
    if (!address.length)
      errors.address = 'Address is required';
    if (!city.length)
      errors.city = 'City is required';
    if (!state.length)
      errors.state = 'State is required';
    if (description.length < 30)
      errors.description = 'Description needs a minimum of 30 characters';
    if (!title.length)
      errors.title = 'Name is required';
    if (!price.length)
      errors.price = 'Price is required';
    if (!previewImage.length)
      errors.previewImage = 'Preview image is required';
    else if (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg'))
      errors.previewImage = 'Image URL must end in .png, .jpg, or .jpeg';
    if (image2 && !image2.endsWith('.png') && !image2.endsWith('.jpg') && !image2.endsWith('.jpeg'))
      errors.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
    if (image3 && !image3.endsWith('.png') && !image3.endsWith('.jpg') && !image3.endsWith('.jpeg'))
      errors.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
    if (image4 && !image4.endsWith('.png') && !image4.endsWith('.jpg') && !image4.endsWith('.jpeg'))
      errors.image4 = 'Image URL must end in .png, .jpg, or .jpeg';
    if (image5 && !image5.endsWith('.png') && !image5.endsWith('.jpg') && !image5.endsWith('.jpeg'))
      errors.image5 = 'Image URL must end in .png, .jpg, or .jpeg';

    setValidationErrors(errors);
  }, [country, address, city, state, description, title, price, previewImage, image2, image3, image4, image5]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.values(validationErrors).length)
      return;

    const spotFormInfo = {
      address,
      city,
      state,
      country,
      lat: -90,
      lng: -180,
      name: title,
      description,
      price
    };

    const created = await dispatch(createSpot(spotFormInfo));
    // console.log(created);

    if (created) {
      const spotId = created.id;

      // console.log('****************');
      // console.log('spotId', spotId);
      // console.log('previewImage', previewImage);
      // console.log(JSON.stringify({url: previewImage, preview: true}));

      // const res = await csrfFetch(`api/spots/${spotId}/images`, {
      //   method: 'POST',
      //   body: JSON.stringify({url: previewImage, preview: true})
      // });

      // console.log('*-*-*-*-*-*-*-*-*-*-*-*');
      // const test = res.json();
      // console.log(test);

      await dispatch(uploadImage(spotId, {url: previewImage, preview: true}));
      if (image2) await dispatch(uploadImage(spotId, {url: image2, preview: false}));
      if (image3) await dispatch(uploadImage(spotId, {url: image3, preview: false}));
      if (image4) await dispatch(uploadImage(spotId, {url: image4, preview: false}));
      if (image5) await dispatch(uploadImage(spotId, {url: image5, preview: false}));
      navigate(`/spots/${spotId}`);
    }
  };

  return (
    <div className='spot-form-page-wrapper'>
      <h1>Create a New Spot</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <form onSubmit={handleSubmit}>
        {/* *** Section 1 *** */}
        <label>Country{' '}
          <span className='error'>
            {hasSubmitted && validationErrors.country && `${validationErrors.country}`}
          </span>
          <input
            type='text'
            placeholder='Country'
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </label>
        <label>Street Address{' '}
          <span className='error'>
            {hasSubmitted && validationErrors.address && `${validationErrors.address}`}
          </span>
          <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <div className='spot-form_city-state'>
          <span>
            <label>City{' '}
              <span className='error'>
                {hasSubmitted && validationErrors.city && `${validationErrors.city}`}
              </span>
              <input
                type='text'
                placeholder='City'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </label>
          </span>
          <span>,</span>
          <span>
            <label>State{' '}
              <span className='error'>
                {hasSubmitted && validationErrors.state && `${validationErrors.state}`}
              </span>
              <input
                type='text'
                placeholder='STATE'
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </label>
          </span>
        </div>
        <hr />
        {/* *** Section 2 *** */}
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          placeholder='Please write at least 30 characters'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.description && `${validationErrors.description}`}
        </div>
        <hr />
        {/* *** Section 3 *** */}
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input
          type='text'
          placeholder='Name of your spot'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.title && `${validationErrors.title}`}
        </div>
        <hr />
        {/* *** Section 4 *** */}
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div>
          <span>$ </span>
          <span>
            <input
              className='spot-form_price'
              type='number'
              placeholder='Price per night (USD)'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </span>
        </div>
        <div className='error'>
          {hasSubmitted && validationErrors.price && `${validationErrors.price}`}
        </div>
        <hr />
        {/* *** Section 5 *** */}
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type='text'
          placeholder='Preview Image URL'
          value={previewImage}
          onChange={e => setPreviewImage(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.previewImage && `${validationErrors.previewImage}`}
        </div>
        <input
          type='text'
          placeholder='Image URL'
          value={image2}
          onChange={e => setImage2(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.image2 && `${validationErrors.image2}`}
        </div>
        <input
          type='text'
          placeholder='Image URL'
          value={image3}
          onChange={e => setImage3(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.image3 && `${validationErrors.image3}`}
        </div>
        <input
          type='text'
          placeholder='Image URL'
          value={image4}
          onChange={e => setImage4(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.image4 && `${validationErrors.image4}`}
        </div>
        <input
          type='text'
          placeholder='Image URL'
          value={image5}
          onChange={e => setImage5(e.target.value)}
        />
        <div className='error'>
          {hasSubmitted && validationErrors.image5 && `${validationErrors.image5}`}
        </div>
        <hr />
        {/* *** Submit *** */}
        <button
          type='submit'
          disabled={hasSubmitted && Object.values(validationErrors).length}
        >
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default SpotForm;
