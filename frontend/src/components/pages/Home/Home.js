import React from 'react';
// import { BrowserRouter as Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import logo from '../../../images/fitness.jpg';
import './home.scss';
import Navbar from '../../common/Navbar/Navbar';
import Footer from '../../common/Footer/Footer';

const Home = ({ loggedInUser }) => {
  // const history = useHistory();

  // const handleClickRegister = () => {
  //   history.push('/register');
  // };
  // const handleClickLogin = () => {
  //   history.push('/login');
  // };

  return (
    <>
      {/* {!loggedInUser ? (
        history.push('./activities')
      ) : ( */}
      <div className='overlay'>
        <div className='home-navbar-cont'>
          <Navbar />
        </div>
        <div className='home-cont'>
          <div className='title-cont'>
            <h1>Fitness Fanatics</h1>
            <h4>A belépéshez regisztráció/bejelentkezés szükséges</h4>
            <div className='buttons'>
              <NavLink to='/register'>
                <button
                  type='button'
                  className='home-btn'
                  // onClick={handleClickRegister}
                >
                  REGISZTRÁCIÓ
                </button>
              </NavLink>
              <NavLink to='/login'>
                <button
                  type='button'
                  className='home-btn'
                  // onClick={handleClickLogin}
                >
                  BEJELENTKEZÉS
                </button>
              </NavLink>
            </div>
          </div>
          <div className='img-cont'>
            <img className='home-img' src={logo} alt='home-img' />
          </div>
        </div>
        <div className='home-footer-cont'>
          <Footer />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Home;
