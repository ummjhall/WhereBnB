import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  const { closeModal } = useModal();

  const validationErrors =
    !firstName.length ||
    !lastName.length ||
    !email.length ||
    username.length < 4 ||
    password.length < 6 ||
    !confirmPassword.length ||
    password !== confirmPassword;

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
          First Name
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <div className='errors'>
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <label>
          Last Name
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <div className='errors'>
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <label>
          Email
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className='errors'>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <label>
          Username
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className='errors'>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className='errors'>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className='errors'>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button
          type='submit'
          disabled={validationErrors}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
