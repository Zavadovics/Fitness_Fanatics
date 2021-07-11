import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './navbar.scss';
import 'bootstrap/dist/js/bootstrap.bundle';

const Navbar = props => {
  const { loggedInUser, setLoggedInUser } = props;
  // console.log('loggedInUser - navbar.js', loggedInUser);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    setLoggedInUser(null);
    history.push('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        {loggedInUser ? (
          <div className='logged-in-cont'>
            <p>
              Üdv <span>{loggedInUser.firstName}</span> !
            </p>
            <button type='button' className='navbar-btn' onClick={handleLogout}>
              KIJELENTKEZÉS
            </button>
          </div>
        ) : (
          <>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon' />
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav nav-item-flex mb-lg-0'>
                <div className='ms-lg-2'>
                  <NavLink to='/' exact className='nav-link'>
                    <li>Főoldal</li>
                  </NavLink>
                </div>
                <div className='nav-item-flex me-lg-2'>
                  <NavLink to='/register' className='nav-link'>
                    <li className='w-100 reg-link'>Regisztráció</li>
                  </NavLink>
                  <div class='vertical-line' style={{ height: '45px' }}></div>
                  <NavLink exact to='/login' className='nav-link'>
                    <li className='w-100'>Bejelentkezés</li>
                  </NavLink>
                </div>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
