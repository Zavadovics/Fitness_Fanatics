import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  meterToKilometers,
  minsToHoursAndMins,
  calorieCounter,
} from '../../../helpers/helper';
import './card.scss';
import Moment from 'react-moment';
import 'moment/locale/hu';

const Card = ({ loggedInUser, profile, activity, activities, setActivities }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);

  const messageTypes = Object.freeze({
    deleteFail: `Tevékenység törlése sikertelen.`,
  });

  /* Delete event */
  const deleteActivityHandler = () => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities/${activity._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          throw Error(
            `could not delete data from database, error status ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        setAlert(null);
        setActivities(
          activities.filter(
            updatedActivities => updatedActivities._id !== activity._id
          )
        );
      })
      .catch(err => {
        setAlert({ alertType: 'danger', message: messageTypes.deleteFail });
      });
  };

  return (
    <>
      <div className='alert-cont'>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>
            <Moment format='LL'>{activity.activityDate}</Moment>-{' '}
            <span>{activity.activityTime}</span>
          </h5>
          <h5 className='card-title'>
            <span>{activity.activityType}</span>
          </h5>
          <h6 className='card-subtitle mb-2 text-muted'>
            {minsToHoursAndMins(activity.duration)} -{' '}
            {meterToKilometers(activity.distance)} KM
            {!profile.weight ? (
              <p></p>
            ) : (
              <span className='card-subtitle mb-2 text-muted'>
                {calorieCounter(activity.duration, profile.weight)} kalória
              </span>
            )}
          </h6>
          <p className='card-text pt-2 comment'>{activity.comment}</p>
        </div>
        <div className='card-button-container'>
          <NavLink to={`/activities/edit/${activity._id}`}>
            <button type='button' className='card-mod-btn'>
              MÓDOSÍTÁS
            </button>
          </NavLink>
          <button
            type='button'
            data-id={activity._id}
            className='card-del-btn'
            onClick={() => deleteActivityHandler(activity._id)}
          >
            TÖRLÉS
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
