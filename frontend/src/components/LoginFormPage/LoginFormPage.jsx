import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function LoginFormPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});

  if (sessionUser)
    return <Navigate to='/' replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({credential, password})).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        else if (data?.message) setErrors(data);
      }
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        {errors.message && <p>{errors.message}</p>}
        <button type='submit'>Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
