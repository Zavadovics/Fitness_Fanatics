import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActivityForm from '../../common/ActivityForm/ActivityForm';
import './editActivity.scss';

const EditActivity = (/* {
  activityFromList = {
    _id: 4,
    duration: '120',
    activityType: 'futás',
    distance: '6000',
    comment: 'cool run',
  },
} */) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const { id } = useParams();
  const [activity, setActivity] = useState('valami');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(`${REACT_APP_SERVER_URL}/api/activities${id}`)
  //     .then(res => {
  //       if (res.status < 200 || res.status >= 300) {
  //         throw Error(
  //           `could not fetch the data from database, error ${res.status}`
  //         );
  //       }
  //       return res.json();
  //     })
  //     .then(jsonRes => {
  //       console.log(jsonRes);
  //       setActivity(jsonRes);
  //       setError(null);
  //       console.log(error);
  //     })
  //     .catch(err => {
  //       setError(err.message);
  //     });
  // }, [REACT_APP_SERVER_URL, error, id]);

  // useEffect(() => {
  //   setActivity(activityFromList);
  // }, [activity, activityFromList]);

  return (
    <div className='edit-activity-cont'>
      <h2>Tevékenység módosítása</h2>
      {activity && <ActivityForm type='edit' selectedActivity={activity} />}
    </div>
  );
};

export default EditActivity;
