import { useState, useEffect, useRef } from 'react';
import InputField from '../../common/InputField/InputField';
import './trainingPlans.scss';

const TrainingPlans = ({ loggedInUser }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [alert, setAlert] = useState(null);

  const [plans, setPlans] = useState([]);

  const messageTypes = Object.freeze({
    uploadSuccess: `Sikeres edzésterv feltöltés.`,
    uploadFail: `Edzésterv feltöltés sikertelen.`,
    deleteSuccess: `Edzésterv sikeresen törölve.`,
    deleteFail: `Edzésterv törlése sikertelen.`,
  });
  const [data, setData] = useState(null);

  const [formValue, setFormValue] = useState({
    title: '',
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    title: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const validators = {
    title: {
      required: isFieldEmpty,
    },
  };

  const validateField = fieldName => {
    const value = formValue[fieldName];
    let isValid = true;
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: '',
    }));
    references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = formErrorTypes[validationType];
            setFormErrors(prev => ({
              ...prev,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  };

  const isFormValid = () => {
    let isValid = true;
    for (const fieldName of Object.keys(formValue)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleInputBlur = e => {
    const { name } = e.target;
    validateField(name);
  };

  useEffect(() => {
    if (loggedInUser) {
      const getPlan = async () => {
        fetch(`${REACT_APP_SERVER_URL}/api/plan`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        })
          .then(res => {
            if (res.status !== 200) {
              throw Error(
                `could not fetch data from database, error ${res.status}`
              );
            }
            return res.json();
          })
          .then(jsonRes => {
            setPlans(jsonRes);
          })
          .catch(err => {
            console.log(err.message);
          });
      };
      getPlan();
    }
  }, [plans]);

  const handleChange = e => {
    setData(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      title: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    let formData = new FormData();
    formData.append('image', data);
    formData.append('user_id', loggedInUser.id);
    formData.append('user_email', loggedInUser.email);
    formData.append('title', formValue.title);
    if (isValid) {
      await fetch(`${REACT_APP_SERVER_URL}/api/plan`, {
        method: 'POST',
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
            setFormValue({
              title: '',
            });
            setData(null);
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.uploadFail });
          }
        });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <div className='training-plan-cont'>
      <h2>Edzéstervek</h2>
      <div className='alert-cont'>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`needs-validation ${formWasValidated && 'was-validated'}`}
      >
        <p>
          Van egy edzésterved ami hasznos lehet másoknak? Itt feltöltheted az
          adatbázisba.
        </p>
        <input
          className='form-control pdf-inputfile'
          name='image'
          type='file'
          id='file'
          accept='/image/*'
          onChange={handleChange}
        />
        <label className='pdf-input-label' htmlFor='file'>
          Válassz egy fájlt (Kattints ide)
        </label>
        <InputField
          centerClass='center'
          name='title'
          type='text'
          labelText='Edzésterv elnevezése'
          value={formValue.title}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          reference={references.title}
          error={formErrors.title}
        />
        <button className='photo-btn' /* onClick={handleSubmit} */>
          Küldés
        </button>
      </form>
      <>
        {plans.map(plan => (
          <div className='object-outer-cont' key={plan._id}>
            <div className='object-cont'>
              <p className='object-title'>{plan.title}</p>
              <object
                className='object-preview'
                data={plan.avatar}
                type='application/pdf'
              >
                {/* <p>
                  {plan.originalName} -{' '}
                  <a target='_blank' rel='noreferrer' href={plan.avatar}>
                    megnyitás
                  </a>
                </p> */}
              </object>
              <p className='object-text'>
                {plan.originalName} -{' '}
                <a target='_blank' rel='noreferrer' href={plan.avatar}>
                  megnyitás
                </a>
              </p>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default TrainingPlans;
