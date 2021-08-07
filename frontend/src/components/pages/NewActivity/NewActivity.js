import ActivityForm from '../../common/ActivityForm/ActivityForm';
import './newActivity.scss';

const NewActivity = ({ loggedInUser }) => {
  return (
    <main className='new-activity-cont'>
      <h2>Új tevékenység hozzáadása +</h2>
      <ActivityForm type='new' loggedInUser={loggedInUser} />
    </main>
  );
};

export default NewActivity;