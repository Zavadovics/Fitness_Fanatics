import ActivityForm from '../../common/ActivityForm/ActivityForm';
import './newActivity.scss';

const NewActivity = () => {
  return (
    <main className='new-activity-cont'>
      <h2>Új tevékenység hozzáadása</h2>
      <ActivityForm type='new' />
    </main>
  );
};

export default NewActivity;
