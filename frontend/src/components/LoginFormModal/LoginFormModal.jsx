import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
// import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({credential, password}))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        else if (data?.message) setErrors(data);
      }
    );
  };

  return (
    <div className='form-wrapper'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-wrapper'>
          <label>
            Username or Email
            <input
              type='text'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <div className='errors'>
            {errors.credential && <p>{errors.credential}</p>}
          </div>
        </div>
        <div className='input-wrapper'>
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
        </div>
        <div className='errors'>
          {errors.message && <p>{errors.message}</p>}
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
