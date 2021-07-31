import { useEffect, useState, useRef } from 'react';
import InputField from '../../common/InputField/InputField';
import validator from 'validator';
import './editProfile.scss';

const EditProfile = ({ profile, setProfile, loggedInUser }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const genderList = ['férfi', 'nő', 'nem szeretném megadni'];
  const [formData, setFormData] = useState(profile);
  // const [formData, setFormData] = useState({
  //   userName: profile.userName,
  //   firstName: profile.firstName,
  //   lastName: profile.lastName,
  //   email: profile.email,
  //   gender: profile.gender,
  //   cityOfResidence: profile.cityOfResidence,
  //   weight: profile.weight === 0 ? profile.weight === '',
  //   birthDate: profile.birthDate,
  //   motivation: profile.motivation,
  // });
  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  // console.log('props - profile', profile);
  // console.log('start - formData', formData);

  /* get cities */
  useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/api/cities`)
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw Error(
            `could not fetch data from database, error ${res.status}`
          );
        }
        return res.json();
      })
      .then(jsonRes => {
        const cityValues = [];
        for (let i = 0; i < jsonRes.length; i++) {
          cityValues.push(jsonRes[i].value);
        }
        setCities(cityValues);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const messageTypes = Object.freeze({
    success: `Sikeres mentés. Az adatokat hozzádtuk az adatbázishoz`,
    fail: `Sikertelen mentés. Adatbázis probléma.`,
  });

  const references = {
    userName: useRef(),
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    gender: useRef(),
    cityOfResidence: useRef(),
    weight: useRef(),
    birthDate: useRef(),
    motivation: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    passwordLength: `A jelszó legalább 6 karakter hosszú kell legyen`,
    validEmail: `Nem megfelelő email formátum`,
  });

  const [formErrors, setFormErrors] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    cityOfResidence: '',
    weight: '',
    birthDate: '',
    motivation: '',
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isEmailInvalid = value => {
    return validator.isEmail(value);
  };

  const validators = {
    userName: {
      required: isFieldEmpty,
    },
    firstName: {
      required: isFieldEmpty,
    },
    lastName: {
      required: isFieldEmpty,
    },
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
    },
    gender: {
      required: isFieldEmpty,
    },
    cityOfResidence: {
      required: isFieldEmpty,
    },
    weight: {
      required: isFieldEmpty,
    },
    birthDate: {
      required: isFieldEmpty,
    },
    motivation: {
      required: isFieldEmpty,
    },
  };

  const validateField = fieldName => {
    const value = formData[fieldName];
    let isValid = true;
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: '',
    }));
    // references[fieldName].current.setCustomValidity('');

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
    Object.keys(formData).forEach(fieldName => {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleInputBlur = e => {
    const { name } = e.target;
    validateField(name);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      cityOfResidence: '',
      weight: '',
      birthDate: '',
      motivation: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      await fetch(`${REACT_APP_SERVER_URL}/api/user/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedInUser.token}`,
        },
        body: JSON.stringify({
          userName: formData.userName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: profile.password,
          gender: formData.gender,
          cityOfResidence: formData.cityOfResidence,
          weight: formData.weight,
          birthDate: formData.birthDate,
          motivation: formData.motivation,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            setTimeout(() => {
              setAlert({ alertType: 'success', message: messageTypes.success });
            }, 3000);
            setProfile(formData);
            // console.log('új adatok sikeresen mentve');
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
            // console.log('új adatok mentése sikertelen');
          }
        });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <>
      <div className='profile-edit-cont'>
        <h2>Profil módosítása</h2>
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
          <div className='input'>
            <InputField
              name='userName'
              type='text'
              labelText='Felhasználónév'
              onChange={handleInputChange}
              value={formData.userName}
              onBlur={handleInputBlur}
              reference={references.userName}
              formError={formErrors.userName}
            />
            <InputField
              name='lastName'
              type='text'
              labelText='Vezetéknév'
              onChange={handleInputChange}
              value={formData.lastName}
              onBlur={handleInputBlur}
              reference={references.lastName}
              formError={formErrors.lastName}
            />
            <InputField
              name='firstName'
              type='text'
              labelText='Keresztnév'
              onChange={handleInputChange}
              value={formData.firstName}
              onBlur={handleInputBlur}
              reference={references.firstName}
              formError={formErrors.firstName}
            />
            <InputField
              name='email'
              type='email'
              labelText='Email'
              onChange={handleInputChange}
              value={formData.email}
              onBlur={handleInputBlur}
              reference={references.email}
              formError={formErrors.email}
            />
            <label className='form-label m-2' htmlFor='activityType'>
              Nem
            </label>
            <select
              className='form-select m-2'
              id='gender'
              name='gender'
              value={formData.gender}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.gender}
              error={formErrors.gender}
            >
              {genderList.map(gender => (
                <option value={gender} key={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <label className='form-label m-2' htmlFor='activityType'>
              Tartózkodási hely
            </label>
            <select
              className='form-select m-2'
              id='cityOfResidence'
              name='cityOfResidence'
              value={formData.cityOfResidence}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.cityOfResidence}
              error={formErrors.cityOfResidence}
            >
              {cities.map(city => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
            <InputField
              name='weight'
              type='number'
              labelText='Testsúly'
              onChange={handleInputChange}
              value={formData.weight}
              onBlur={handleInputBlur}
              reference={references.weight}
              formError={formErrors.weight}
            />
            <InputField
              name='birthDate'
              type='date'
              labelText='Születési dátum'
              onChange={handleInputChange}
              value={formData.birthDate}
              onBlur={handleInputBlur}
              reference={references.birthDate}
              formError={formErrors.birthDate}
            />
            <InputField
              name='motivation'
              type='motivation'
              labelText='Motivációs szöveg'
              onChange={handleInputChange}
              value={formData.motivation}
              onBlur={handleInputBlur}
              reference={references.motivation}
              formError={formErrors.motivation}
            />
          </div>
          <button type='submit' className='profile-edit-btn'>
            MENTÉS
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
