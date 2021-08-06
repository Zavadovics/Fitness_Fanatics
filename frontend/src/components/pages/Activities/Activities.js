import React, { useState, useEffect } from 'react';
import Card from '../../common/Card/Card';
import './activities.scss';

/* TO-DO
- filter by activity type and duration
*/
const Activities = ({ profile, loggedInUser }) => {
  // window.location.reload();

  const { REACT_APP_SERVER_URL } = process.env;
  const [activities, setActivities] = useState([]);
  const [alert, setAlert] = useState(null);

  const messageTypes = Object.freeze({
    dbProblem: `Adatbázis probléma.`,
  });

  /* Get all activities */
  useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities/${loggedInUser.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          setAlert({ alertType: 'danger', message: messageTypes.dbProblem });
          throw Error(
            `could not fetch the data from database, error ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        setActivities(jsonRes);
      })
      .catch(err => {
        setAlert({ alertType: 'danger', message: messageTypes.dbProblem });
      });
  }, []);

  return (
    <>
      <div className='activities-cont'>
        <h2>Tevékenységek</h2>
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>
        {activities.length === 0 ? (
          <p className='no-activities'>
            Nincs egy megjeleníthető tevékenység sem.
          </p>
        ) : (
          <>
            {activities.map(activity => (
              <div className='card-cont' key={activity._id}>
                <Card
                  profile={profile}
                  activity={activity}
                  activities={activities}
                  setActivities={setActivities}
                  loggedInUser={loggedInUser}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Activities;
