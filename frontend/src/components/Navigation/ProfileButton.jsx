import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target))
        setShowMenu(false);
    }
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // closeMenu();
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  // return (
  //   <>
  //     <button onClick={toggleMenu}>
  //       <i className='fas fa-user-circle' />
  //     </button>
  //     <ul className={ulClassName} ref={ulRef}>
  //       <li>{user.username}</li>
  //       <li>{user.firstName} {user.lastName}</li>
  //       <li>{user.email}</li>
  //       <li>
  //         <button onClick={handleLogout}>Log Out</button>
  //       </li>
  //     </ul>
  //   </>
  // );

  return (
    <>
      <button onClick={toggleMenu}>
        <i className='fas fa-user-circle' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText='Log In'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText='Sign Up'
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
