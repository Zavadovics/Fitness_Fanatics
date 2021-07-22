import { useEffect, useState, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import InputField from '../../common/InputField/InputField';
import SelectField from '../../common/SelectField/SelectField';
import validator from 'validator';
import './editProfile.scss';

/* FIX PASSWORD VALIDATION */
const EditProfile = ({ loggedInUser, profile, setProfile }) => {
  const { REACT_APP_SERVER_URL } = process.env;

  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState('');
  const [cityToBeAdded, setCityToBeAdded] = useState('');
  const [error, setError] = useState(null);

  const genderList = ['férfi', 'nő', 'nem szeretném megadni'];

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    password: '',
    email: '',
  });

  // const [profile, setProfile] = useState({
  //   userName: '',
  //   gender: '',
  //   cityOfResidence: '',
  //   weight: '',
  //   birthDate: '',
  //   motivation: '',
  // });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      fetch(`${REACT_APP_SERVER_URL}/api/user/${loggedInUser.id}`)
        .then(res => {
          if (res.status < 200 || res.status >= 300) {
            throw Error(
              `could not fetch the data from database, error ${res.status}`
            );
          }
          return res.json();
        })
        .then(jsonRes => {
          const { password, ...rest } = jsonRes;
          setFormData(rest);
          setError(null);
          // console.log(error);
        })
        .catch(err => {
          // console.error(err);
          setError(err.message);
        });
    };
    getProfile();
  }, []);

  /* City selector */

  // const customStyles = {
  //   input: (provided, state) => ({
  //     ...provided,
  //     color: 'red',
  //     width: '110%',
  //   }),
  // };

  const handleSelectChange = (newValue, actionMeta) => {
    // console.group('Value Changed');
    // console.log(newValue);
    setCitySelected(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };
  const handleSelectInputChange = (inputValue, actionMeta) => {
    // console.group('Input Changed');
    // console.log(inputValue);
    setCityToBeAdded(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

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
        setCities(jsonRes);
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
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    passwordLength: `A jelszó legalább 6 karakter hosszú kell legyen`,
    validEmail: `Nem megfelelő email formátum`,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isEmailInvalid = value => {
    return validator.isEmail(value);
  };

  const isPasswordValid = value => {
    return value.length >= 6;
  };

  const validators = {
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
    password: {
      required: isFieldEmpty,
      passwordLength: isPasswordValid,
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
    for (const fieldName of Object.keys(formData)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    }
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
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    if (citySelected !== '') {
      formData.cityOfResidence = citySelected.value;
    }
    if (cityToBeAdded !== '') {
      formData.cityOfResidence = cityToBeAdded;
      /* fetch to cities db to add new city */
    }

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      console.log(formData);
      await fetch(`${REACT_APP_SERVER_URL}/api/user/${loggedInUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData, profile),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            setTimeout(() => {
              setAlert({ alertType: 'success', message: messageTypes.success });
            }, 3000);
            setCitySelected('');
            setCityToBeAdded('');
            console.log('új adatok sikeresen mentve');
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
            console.log('új adatok mentése sikertelen');
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
              // onBlur={handleInputBlur}
              value={formData.userName}
              // reference={references.userName}
              // formError={formErrors.userName}
            />
            <InputField
              name='lastName'
              type='text'
              labelText='Vezetéknév'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.lastName}
              reference={references.lastName}
              // formError={formErrors.lastName}
            />
            <InputField
              name='firstName'
              type='text'
              labelText='Keresztnév'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.firstName}
              reference={references.firstName}
              formError={formErrors.firstName}
            />
            <InputField
              name='email'
              type='email'
              labelText='Email'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.email}
              reference={references.email}
              formError={formErrors.email}
            />
            <InputField
              name='password'
              type='password'
              labelText='Jelszó'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.password}
              reference={references.password}
              formError={formErrors.password}
            />
            <SelectField
              labelText='Nem'
              name='gender'
              id='gender'
              valueList={genderList}
              onChange={handleInputChange}
              value={formData.gender}
              // reference={references.gender}
              // formError={formErrors.gender}
            />
            {/* <SelectField
              labelText='Tartózkodási hely'
              name='cityOfResidence'
              id='cityOfResidence'
              valueList={cities}
              onChange={handleInputChange}
              value={formData.cityOfResidence}
              reference={references.cityOfResidence}
              formError={formErrors.cityOfResidence}
            /> */}
            <div className='citySelect'>
              <label htmlFor='cityOfResidence'>Tartózkodási hely</label>
              <CreatableSelect
                id='cityOfResidence'
                isClearable
                onChange={handleSelectChange}
                onInputChange={handleSelectInputChange}
                options={cities}
                placeholder='Válassz!'
                // styles={customStyles}
              />
            </div>

            <InputField
              name='weight'
              type='number'
              labelText='Testsúly'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={formData.weight}
              // reference={references.weight}
              // formError={formErrors.weight}
            />
            <InputField
              name='birthDate'
              type='date'
              labelText='Születési dátum'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={formData.birthDate}
              // reference={references.birthDate}
              // formError={formErrors.birthDate}
            />
            <InputField
              name='motivation'
              type='motivation'
              labelText='Motivációs szöveg'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={formData.motivation}
              // reference={references.motivation}
              // formError={formErrors.motivation}
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
