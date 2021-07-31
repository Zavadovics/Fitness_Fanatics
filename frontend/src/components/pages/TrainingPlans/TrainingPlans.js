import { useState, useEffect } from 'react';
import './trainingPlans.scss';

const TrainingPlans = ({ loggedInUser }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [alert, setAlert] = useState(null);

  const [plan, setPlan] = useState([]);

  const messageTypes = Object.freeze({
    uploadSuccess: `Sikeres edzésterv feltöltés.`,
    uploadFail: `Edzésterv feltöltés sikertelen.`,
    deleteSuccess: `Edzésterv sikeresen törölve.`,
    deleteFail: `Edzésterv törlése sikertelen.`,
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

    await fetch(`${REACT_APP_SERVER_URL}/api/plan/${loggedInUser.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          setAlert({
            alertType: 'success',
            message: messageTypes.uploadSuccess,
          });
          setPlan(res.image);
          setData(null);
        } else {
          setAlert({ alertType: 'danger', message: messageTypes.uploadFail });
        }
      });
  };

  return (
    <div>
      <h1>Edzéstervek</h1>
      <div className='mb-3'>
        <input
          className='form-control inputfile'
          name='image'
          type='file'
          id='file'
          accept='/image/*'
          onChange={handleChange}
        />
        <label className='input-label' for='file'>
          Válassz egy fájlt (Kattints ide)
        </label>
      </div>
      <div className='text-center'>
        <button className='photo-btn' onClick={handleSubmit}>
          Küldés
        </button>
      </div>
    </div>
  );
};

export default TrainingPlans;
