import { useState } from 'react';
import user from '../../../images/user.png';
import './editPhoto.scss';

const EditPhoto = ({ loggedInUser, userPhoto, setUserPhoto }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [alert, setAlert] = useState(null);
  const messageTypes = Object.freeze({
    uploadSuccess: `Sikeres fotó feltöltés.`,
    uploadFail: `Fotó feltöltés sikertelen.`,
    deleteSuccess: `Fotó sikeresen törölve.`,
    deleteFail: `Fotó törlés sikertelen.`,
  });
  const [data, setData] = useState(null);

  const handleChange = e => {
    setData(e.target.files[0]);
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('image', data);
    formData.append('user_id', loggedInUser.id);
    formData.append('user_email', loggedInUser.email);
    await fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          window.scrollTo(0, 0);
          setAlert({
            alertType: 'success',
            message: messageTypes.uploadSuccess,
          });
          setUserPhoto(res.image);
          setData(null);
        } else {
          setAlert({ alertType: 'danger', message: messageTypes.uploadFail });
        }
      });
  };

  const handleDelete = async () => {
    await fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          setAlert({
            alertType: 'success',
            message: messageTypes.deleteSuccess,
          });
          setUserPhoto('');
          setData(null);
        } else {
          setAlert({ alertType: 'danger', message: messageTypes.deleteFail });
        }
      });
  };

  return (
    <div className='edit-photo-cont'>
      <h2>Profilkép</h2>
      <div className='alert-cont'>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>
      <div className='inner'>
        <div className='user-photo-cont'>
          {userPhoto !== '' ? (
            <img src={userPhoto} alt='' />
          ) : (
            <img src={user} alt='' />
          )}
        </div>
        <p>
          <span>Név: </span>
          <span>{loggedInUser.firstName}</span>
        </p>
        <p>
          <span>Email cím: </span>
          <span>{loggedInUser.email}</span>
        </p>
        <p>
          Új fotót töltenél fel vagy lecserélnéd a jelenlegi profilképed? Itt
          mindkettőt megteheted.
        </p>

        <div className='mb-3'>
          <input
            className='form-control inputfile'
            name='image'
            type='file'
            id='file'
            accept='/image/*'
            onChange={handleChange}
          />
          <label className='input-label' htmlFor='file'>
            Válassz egy fájlt (Kattints ide)
          </label>
        </div>
        <div className='text-center'>
          <button className='photo-btn' onClick={handleSubmit}>
            Küldés
          </button>
        </div>
        <p>Törölnéd a fotódat? Csak kattints az X-re.</p>
        <button
          className='del-btn'
          onClick={() => handleDelete(loggedInUser.id)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default EditPhoto;
