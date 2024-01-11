import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import logo from '../../../../images/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div className='header-wrapper'>
        <span>
          <NavLink to="/"><img id='logo' src={logo} alt='logo' /></NavLink>
        </span>
        {isLoaded && (
          <span>
            <ProfileButton user={sessionUser} />
          </span>
        )}
      </div>
      <hr />
    </>
  );
}

export default Navigation;
