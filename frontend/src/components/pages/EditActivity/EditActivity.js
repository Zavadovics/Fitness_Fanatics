import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActivityForm from '../../common/ActivityForm/ActivityForm';
import './editActivity.scss';

const EditActivity = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const { id } = useParams();
  const [activity, setActivity] = useState('');
  const [error, setError] = useState(null);

  console.log(id);
  useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/api/activities/${id}`)
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw Error(
            `could not fetch the data from database, error ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        console.log('jsonRes', jsonRes);

        setActivity({
          activityDate: jsonRes.activityDate,
          activityTime: jsonRes.activityTime,
          distance: jsonRes.distance,
          activityType: jsonRes.activityType,
          duration: jsonRes.duration,
          comment: jsonRes.comment,
        });
        console.log(activity);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [REACT_APP_SERVER_URL, error, id /* activity INFINITE */]);

  return (
    <main className='edit-activity-cont'>
      <h2>Tevékenység módosítása</h2>
      {error && <div className='error'>{error}</div>}
      {activity && <ActivityForm type='edit' activity={activity} />}
    </main>
  );
};

export default EditActivity;
