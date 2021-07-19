import { useEffect, useState } from 'react';
import user from '../../../images/user.png';
import './editPhoto.scss';
/* TO-DO
- can't get response 200 to display correct alert
- can/t reload page without window.location.reload
- check if user has a photo in db already
 */
const EditPhoto = ({ loggedInUser, userPhoto, setUserPhoto }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [alert, setAlert] = useState(null);

  // const [userPhoto, setUserPhoto] = useState({
  //   user_id: loggedInUser.id,
  //   image: '',
  // });

  // const [error, setError] = useState(null);

  const messageTypes = Object.freeze({
    success: `Sikeres fotó feltöltés.`,
    fail: `Fotó feltöltés sikertelen.`,
  });

  // console.log('userPhoto', userPhoto);

  // useEffect(() => {
  //   const getPhoto = async () => {
  //     fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`)
  //       .then(res => {
  //         if (res.status < 200 || res.status >= 300) {
  //           throw Error(
  //             `could not fetch the data from database, error ${res.status}`
  //           );
  //         }
  //         return res.json();
  //       })
  //       .then(jsonRes => {
  //         setUserPhoto({
  //           user_id: jsonRes[0].user_id,
  //           image: jsonRes[0].avatar,
  //         });
  //         // console.log('json data', jsonRes);
  //         setError(null);
  //         // console.log(error);
  //       })
  //       .catch(err => {
  //         setError(err.message);
  //       });
  //   };
  //   getPhoto();
  // }, []);

  const handleChange = e => {
    setUserPhoto({ ...userPhoto, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('image', userPhoto.image);
    formData.append('user_id', loggedInUser.id);

    await fetch(`${REACT_APP_SERVER_URL}/api/photo`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        window.location.reload();
        if (res.status === 200) {
          // setAlert({ alertType: 'success', message: messageTypes.success });
          setUserPhoto(formData);
          console.log('all good');
        } else {
          console.log('INCORRECT RESPONSE - FIX ME !!!');
          // setAlert({ alertType: 'danger', message: messageTypes.fail });
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
        {userPhoto.image !== '' ? (
          <img src={userPhoto.image} alt='' />
        ) : (
          <img src={user} alt='' />
        )}
        <p>Név: {loggedInUser.firstName}</p>
        <p>Email cím: {loggedInUser.email}</p>
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
      </div>
    </div>
  );
};

export default EditPhoto;
