import React from 'react';
import { NavLink } from 'react-router-dom';
import { meterToKilometers } from '../../../helpers/helper';
import { minsToHoursAndMins } from '../../../helpers/helper';
/* TO-DO
fix date in db */
import './card.scss';

const Card = ({
  startDateAndTime,
  duration,
  activityType,
  distance,
  calories,
  comment,
  _id,
  deleteActivityHandler,
}) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>
          {startDateAndTime}2020.02.02. 14.30 - <span>{activityType}</span>
        </h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          {minsToHoursAndMins(duration)} - {meterToKilometers(distance)} KM -{' '}
          {calories} 500 kalória
        </h6>
        <p className='card-text pt-2 comment'>
          {comment} - rohadt meleg volt, rohadt meleg volt, rohadt meleg volt,
          rohadt meleg volt, rohadt meleg volt, rohadt meleg volt
        </p>
      </div>
      <div className='card-button-container'>
        <NavLink to={`/activities/edit/${_id}`}>
          <button type='button' className='card-mod-btn'>
            MÓDOSÍTÁS
          </button>
        </NavLink>
        <button
          type='button'
          data-id={_id}
          className='card-del-btn'
          onClick={() => deleteActivityHandler(_id)}
        >
          TÖRLÉS
        </button>
      </div>
    </div>
  );
};

export default Card;
