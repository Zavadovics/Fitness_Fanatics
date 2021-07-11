import ActivityForm from '../../common/ActivityForm/ActivityForm';
import './newActivity.scss';

const NewActivity = () => {
  return (
    <div className='new-activity-cont'>
      <h2>Új tevékenység hozzáadása</h2>
      <ActivityForm type={'new'} />
    </div>
  );
};

export default NewActivity;
