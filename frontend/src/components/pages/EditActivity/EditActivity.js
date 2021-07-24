import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActivityForm from '../../common/ActivityForm/ActivityForm';
import './editActivity.scss';

const EditActivity = ({ loggedInUser }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const { id } = useParams();
  const [activity, setActivity] = useState('');
  const [error, setError] = useState(null);

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
        setActivity(
          jsonRes.filter(singleActivity => singleActivity._id === id)
        );
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <main className='edit-activity-cont'>
      <h2>Tevékenység módosítása</h2>
      {error && <div className='error'>{error}</div>}
      {activity && (
        <ActivityForm
          type='edit'
          activity={activity[0]}
          loggedInUser={loggedInUser}
        />
      )}
    </main>
  );
};

export default EditActivity;
