import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  const { closeModal } = useModal();
  const disabled = credential.length < 4 || password.length < 6;

  const login = (credentials) => {
    dispatch(sessionActions.login(credentials))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        else if (data?.message) {
          if (data.message === 'Invalid credentials')
            data.message = 'The provided credentials were invalid';
          setErrors(data);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    login({credential, password});
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    setErrors({});
    login({
      credential: 'DemoUser01',
      password: 'demopassword'
    });
  }

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
        <button
          className={`login-button ${disabled ? '' : 'enabled'}`}
          type='submit'
          disabled={disabled}
        >
          Log In
        </button>
        <div className='demo-button'>
          <a href='' onClick={handleDemoClick}>
            Demo User
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
