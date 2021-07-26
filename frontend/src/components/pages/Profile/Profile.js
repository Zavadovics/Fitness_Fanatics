import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import user from '../../../images/user.png';
import './profile.scss';

const Profile = ({ loggedInUser, profile, setProfile, userPhoto }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      fetch(`${REACT_APP_SERVER_URL}/api/user/${loggedInUser.id}`)
        .then(res => {
          if (res.status < 200 || res.status >= 300) {
            throw Error(
              `could not fetch the data from database, error ${res.status}`
            );
          }
          return res.json();
        })
        .then(jsonRes => {
          setProfile(jsonRes);
          setError(null);
          // console.log(error);
        })
        .catch(err => {
          setError(err.message);
        });
    };
    getProfile();
  }, [REACT_APP_SERVER_URL, error, loggedInUser.id, setProfile]);

  return (
    <>
      <div className='view-profile-cont'>
        <h2>Saját profil</h2>
        <div className='profile-card'>
          <div className='user-photo-cont'>
            {userPhoto !== '' ? (
              <img src={userPhoto} alt='' />
            ) : (
              <img src={user} alt='' />
            )}
          </div>
          <div className='text-cont'>
            <div className='text-row'>
              <p>Felhasználónév:</p>
              <p>{profile.userName}</p>
            </div>
            <div className='text-row'>
              <p>Vezetéknév:</p>
              <p>{profile.lastName}</p>
            </div>
            <div className='text-row'>
              <p>Keresztnév</p>
              <p>{profile.firstName}</p>
            </div>
            <div className='text-row'>
              <p>Email cím</p>
              <p>{profile.email}</p>
            </div>
            <div className='text-row'>
              <p>Nem:</p>
              <p>{profile.gender}</p>
            </div>
            <div className='text-row'>
              <p>Tartózkodási hely:</p>
              <p>{profile.cityOfResidence}</p>
            </div>
            <div className='text-row'>
              <p>Testsúly:</p>
              {profile.weight === 0 ? <p></p> : <p>{profile.weight}</p>}
            </div>
            <div className='text-row'>
              <p>Születési dátum:</p>
              {profile.birthDate ===
                'Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)' ||
              profile.birthDate === '' ? (
                <p></p>
              ) : (
                <p>{profile.weight}</p>
              )}
            </div>
            <div className='text-row'>
              <p>Motivációs szöveg:</p>
              <p>{profile.motivation}</p>
            </div>
          </div>

          <NavLink to={`/profile/edit/${loggedInUser.id}`}>
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
