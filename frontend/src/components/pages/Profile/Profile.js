import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../../../images/user.png';
import './profile.scss';

const Profile = () => {
  const _id = 1234;

  /* fetch data and get id */
  return (
    <>
      <div className='view-profile-cont'>
        <h2>Saját profil</h2>
        <div className='profile-card'>
          <img src={user} alt='user' />
          <div className='text-cont'>
            <div className='text-row'>
              <p>Felhasználónév:</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Vezetéknév:</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Keresztnév</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Nem:</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Tartózkodási hely:</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Testsúly:</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Születés dátuma:</p>
              <p>még nincs adat</p>
            </div>
            <div className='text-row'>
              <p>Motivációs szöveg:</p>
              <p>még nincs adat</p>
            </div>
          </div>
          <NavLink to={`/profile/edit/${_id}`}>
            <button type='button' className='prof-mod-btn'>
              MÓDOSÍTÁS
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Profile;
