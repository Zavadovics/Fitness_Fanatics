import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';

import './activities.scss';

const Activities = () => {
  const { REACT_APP_SERVER_URL } = process.env;

  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  /* Get all activities */

  useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities`)
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw Error(
            `could not fetch the data from database, error ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        console.log(jsonRes);
        setActivities(jsonRes);
        setError(null);
        console.log(error);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [REACT_APP_SERVER_URL, error]);

  /* Delete event */

  const deleteActivityHandler = userId => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(null),
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
        console.log(`event has been deleted, ${jsonRes}`);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <>
      <div className='activities-cont'>
        <h2>Tevékenységek</h2>
        {activities.map(activity => (
          <div className='card-cont' key={activity._id}>
            <Card
              deleteActivityHandler={deleteActivityHandler}
              startDateAndTime={activity.startDateAndTime}
              duration={activity.duration}
              activityType={activity.activityType}
              distance={activity.distance}
              calories={activity.calories}
              comment={activity.comment}
              _id={activity._id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Activities;
