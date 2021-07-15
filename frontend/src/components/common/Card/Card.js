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

const Card = ({ profile, activity }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [error, setError] = useState(null);
  const weight = profile.weight === undefined ? 80 : profile.weight;

  /* Delete event */

  const deleteActivityHandler = activityId => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: activityId }),
    })
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw Error(
            `could not delete data from database, error status ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        console.log(`activity has been deleted, ${jsonRes}`);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        console.log(error);
      });
  };

  return (
    <>
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
            {meterToKilometers(activity.distance)} KM -{' '}
            {calorieCounter(activity.duration, weight)} kalória
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
