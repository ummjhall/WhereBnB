import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import logo from '../../../../images/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div className='header-wrapper'>
        <div>
          <NavLink to="/"><img id='logo' src={logo} alt='logo' /></NavLink>
        </div>
        <div className='header_right-wrapper'>
          {sessionUser && (
            <Link to='/spots/new'>
              Create a New Spot
            </Link>
          )}
          {isLoaded && (
            <span>
              <ProfileButton user={sessionUser} />
            </span>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}

export default Navigation;
