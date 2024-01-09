import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // const sessionLinks = sessionUser ? (
  //   <li>
  //     <ProfileButton user={sessionUser} />
  //   </li>
  // ) : (
  //   <>
  //     <li>
  //       {/* <NavLink to="/login">Log In</NavLink> */}
  //       <OpenModalButton
  //         buttonText='Log In'
  //         modalComponent={<LoginFormModal />}
  //       />
  //     </li>
  //     <li>
  //       {/* <NavLink to="/signup">Sign Up</NavLink> */}
  //       <OpenModalButton
  //         buttonText='Sign Up'
  //         modalComponent={<SignupFormModal />}
  //       />
  //     </li>
  //   </>
  // );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
