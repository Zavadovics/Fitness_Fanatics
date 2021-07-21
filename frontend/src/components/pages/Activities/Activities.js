import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import './activities.scss';

/* TO-DO
- filter by activity type and duration
*/
const Activities = ({ profile, loggedInUser }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  /* Get all activities */

  useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities/${loggedInUser.id}`)
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw Error(
            `could not fetch the data from database, error ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        setActivities(jsonRes);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [REACT_APP_SERVER_URL, error]);

  return (
    <>
      <div className='activities-cont'>
        <h2>Tevékenységek</h2>
        {activities.length === 0 ? (
          <p className='no-activities'>
            Nincs egy megjeleníthető tevékenység sem.
          </p>
        ) : (
          <>
            {activities.map((activity, index) => (
              <div className='card-cont' key={activity._id}>
                <Card profile={profile} activity={activity} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Activities;
