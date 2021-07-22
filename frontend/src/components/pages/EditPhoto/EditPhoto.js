import { useState, useEffect } from 'react';
import user from '../../../images/user.png';
import './editPhoto.scss';

/* TO-DO
- can/t reload page without window.location.reload
 */

const EditPhoto = ({ loggedInUser, userPhoto, setUserPhoto }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [alert, setAlert] = useState(null);

  const messageTypes = Object.freeze({
    uploadSuccess: `Sikeres fotó feltöltés.`,
    uploadFail: `Fotó feltöltés sikertelen.`,
    deleteSuccess: `Fotó sikeresen törölve.`,
    deleteFail: `Fotó törlés sikertelen.`,
  });

  const handleChange = e => {
    console.log(e.target.files[0]);
    setUserPhoto({ ...userPhoto, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('image', userPhoto.image);
    formData.append('user_id', loggedInUser.id);

    await fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setAlert({
            alertType: 'success',
            message: messageTypes.uploadSuccess,
          });
          setUserPhoto({ ...userPhoto, image: '' });
          // window.location.reload();
        } else {
          setAlert({ alertType: 'danger', message: messageTypes.uploadFail });
        }
      });
  };

  const handleDelete = async () => {
    await fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setAlert({
            alertType: 'success',
            message: messageTypes.deleteSuccess,
          });
          setUserPhoto({ ...userPhoto, image: '' });
        } else {
          setAlert({ alertType: 'danger', message: messageTypes.deleteFail });
        }
      });
  };

  return (
    <div className='edit-photo-cont'>
      <div className='alert-cont'>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>
      <div className='inner'>
        <h2>Profilkép</h2>
        <div className='user-photo-cont'>
          {userPhoto.image !== '' ? (
            <img src={userPhoto.image} alt='' />
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
        <div className='mb-3'>
          <input
            className='form-control'
            name='image'
            type='file'
            accept='image/*'
            onChange={handleChange}
          />
        </div>
        <div className='text-center'>
          <button className='photo-btn' onClick={handleSubmit}>
            Küldés
          </button>
        </div>
        <p>Törölnéd a fotódat? Csak kattints az X-re.</p>
        <button
          className='btn btn-danger '
          onClick={() => handleDelete(loggedInUser.id)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default EditPhoto;
