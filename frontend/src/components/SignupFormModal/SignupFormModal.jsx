import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: 'Confirm Password field must be the same as the Password field'
      });
    }

    setErrors({});

    return dispatch(sessionActions.signup({
      email,
      username,
      firstName,
      lastName,
      password
    }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className='form-wrapper'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p className='errors'>
          {errors.email && <p>{errors.email}</p>}
        </p>
        <label>
          Username
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p className='errors'>
          {errors.username && <p>{errors.username}</p>}
        </p>
        <label>
          First Name
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <p className='errors'>
          {errors.firstName && <p>{errors.firstName}</p>}
        </p>
        <label>
          Last Name
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <p className='errors'>
          {errors.lastName && <p>{errors.lastName}</p>}
        </p>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className='errors'>
          {errors.password && <p>{errors.password}</p>}
        </p>
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p className='errors'>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </p>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
