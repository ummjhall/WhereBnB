// import { useState } from 'react';
import './SpotForm.css';

function SpotForm() {
  // const [ country, setCountry ] = useState('');
  // const [ address, setAddress ] = useState('');
  // const [ city, setCity ] = useState('');
  // const [ state, setState ] = useState('');
  // const [ description, setDescription ] = useState('');
  // const [ title, setTitle ] = useState('');
  // const [ price, setPrice ] = useState(0);
  // const [ previewImage, setPreviewImage ] = useState('');
  // const [ image2, setImage2 ] = useState('');
  // const [ image3, setImage3 ] = useState('');
  // const [ image4, setImage4 ] = useState('');
  // const [ image5, setImage5 ] = useState('');



  return (
    <div className='spot-form-page-wrapper'>
      <h1>Create a New Spot</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <form>
        {/* *** Section 1 *** */}
        <label>Country
          <input type='text' placeholder='Country' />
        </label>
        <label>Street Address
          <input type='text' placeholder='Address' />
        </label>
        <div className='spot-form_city-state'>
          <span>
            <label>City
              <input type='text' placeholder='City' />
            </label>
          </span>
          <span>,</span>
          <span>
            <label>State
              <input type='text' placeholder='STATE' />
            </label>
          </span>
        </div>
        <hr />
        {/* *** Section 2 *** */}
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea placeholder='Please write at least 30 characters' />
        <hr />
        {/* *** Section 3 *** */}
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input type='text' placeholder='Name of your spot' />
        <hr />
        {/* *** Section 4 *** */}
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div>
          <span>$ </span>
          <span><input className='spot-form_price' type='number' placeholder='Price per night (USD)' /></span>
        </div>
        <hr />
        {/* *** Section 5 *** */}
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input type='text' placeholder='Preview Image URL' />
        <input type='text' placeholder='Image URL' />
        <input type='text' placeholder='Image URL' />
        <input type='text' placeholder='Image URL' />
        <input type='text' placeholder='Image URL' />
        <hr />
        {/* *** Submit *** */}
        <button type='submit'>Create Spot</button>
      </form>
    </div>
  );
}

export default SpotForm;
