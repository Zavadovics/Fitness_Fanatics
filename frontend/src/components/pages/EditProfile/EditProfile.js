import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import InputField from '../../common/InputField/InputField';
import SelectField from '../../common/SelectField/SelectField';
import './editProfile.scss';

const EditProfile = ({ loggedInUser }) => {
  const { REACT_APP_SERVER_URL } = process.env;
  // console.log('EditProfile - ', profile);

  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState('');
  const [cityToBeAdded, setCityToBeAdded] = useState('');
  const [error, setError] = useState(null);

  const genderList = ['férfi', 'nő', 'nem szeretném megadni'];

  const [profile, setProfile] = useState('');
  // const [profile, setProfile] = useState({
  //   userName: '',
  //   password: '',
  //   lastName: '',
  //   firstName: '',
  //   gender: '',
  //   cityOfResidence: '',
  //   weight: '',
  //   birthDate: '',
  //   motivation: '',
  // });

  const [alert, setAlert] = useState(null);
  // const [formWasValidated, setFormWasValidated] = useState(false);

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
          setProfile({
            userName: jsonRes.userName,
            firstName: jsonRes.firstName,
            lastName: jsonRes.lastName,
            email: jsonRes.email,
            password: jsonRes.password,
            gender: jsonRes.gender,
            cityOfResidence: jsonRes.cityOfResidence,
            weight: jsonRes.weight,
            birthDate: jsonRes.birthDate,
            motivation: jsonRes.motivation,
          });
          setError(null);
          // console.log(error);
        })
        .catch(err => {
          setError(err.message);
        });
    };
    getProfile();
  }, [REACT_APP_SERVER_URL, error]);

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

  // console.log(citySelected);
  // console.log(cityToBeAdded);

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
        // console.log(jsonRes);
        setCities(jsonRes);
        setError(null);
        // console.log(error);
      })
      // const cityList = [];
      // jsonRes.map(city => {
      //   cityList.push(city.name);
      //   return cityList;
      .catch(err => {
        setError(err.message);
      });
  }, [REACT_APP_SERVER_URL, error]);

  // const references = {
  //   userName: useRef(),
  //   password: useRef(),
  //   lastName: useRef(),
  //   firstName: useRef(),
  //   gender: useRef(),
  //   cityOfResidence: useRef(),
  //   weight: useRef(),
  //   birthDate: useRef(),
  //   motivation: useRef(),
  // };

  // const formErrorTypes = Object.freeze({
  //   required: `A mező kitöltése kötelező`,
  //   positive: `A megadott érték nem lehet negativ.`,
  // });

  // const [formErrors, setFormErrors] = useState({
  //   userName: '',
  //   password: '',
  //   lastName: '',
  //   firstName: '',
  //   gender: '',
  //   cityOfResidence: '',
  //   weight: '',
  //   birthDate: '',
  //   motivation: '',
  // });

  const messageTypes = Object.freeze({
    success: `Sikeres mentés. Az adatokat hozzádtuk az adatbázishoz`,
    fail: `Sikertelen mentés. Adatbázis probléma.`,
  });

  // const isFieldEmpty = value => {
  //   return value !== '';
  // };

  // const isValueNegative = value => {
  //   return value >= 0;
  // };

  // const validators = {
  //   userName: {
  //     required: isFieldEmpty,
  //   },
  //   password: {
  //     required: isFieldEmpty,
  //   },
  //   firstName: {
  //     required: isFieldEmpty,
  //   },
  //   lastName: {
  //     required: isFieldEmpty,
  //   },
  //   gender: {
  //     required: isFieldEmpty,
  //   },
  //   cityOfResidence: {
  //     required: isFieldEmpty,
  //   },
  //   weight: {
  //     required: isFieldEmpty,
  //     positive: isValueNegative,
  //   },
  //   birthDate: {
  //     required: isFieldEmpty,
  //   },
  //   motivation: {
  //     required: isFieldEmpty,
  //   },
  // };

  // const validateField = fieldName => {
  //   const value = profile[fieldName];
  //   let isValid = true;
  //   setFormErrors(prev => ({
  //     ...prev,
  //     [fieldName]: '',
  //   }));
  //   references[fieldName].current.setCustomValidity('');

  //   if (validators[fieldName] !== undefined) {
  //     for (const [validationType, validatorFn] of Object.entries(
  //       validators[fieldName]
  //     )) {
  //       if (isValid) {
  //         isValid = validatorFn(value);
  //         if (!isValid) {
  //           const errorText = formErrorTypes[validationType];
  //           setFormErrors(prev => ({
  //             ...prev,
  //             [fieldName]: errorText,
  //           }));
  //           references[fieldName].current.setCustomValidity(errorText);
  //         }
  //       }
  //     }
  //   }
  //   return isValid;
  // };

  // const isFormValid = () => {
  //   let isValid = true;
  //   for (const fieldName of Object.keys(profile)) {
  //     const isFieldValid = validateField(fieldName);
  //     if (!isFieldValid) {
  //       isValid = false;
  //     }
  //   }
  //   return isValid;
  // };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // const handleInputBlur = e => {
  //   const { name } = e.target;
  //   validateField(name);
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    setAlert(null);
    // setFormErrors({
    //   userName: '',
    //   password: '',
    //   lastName: '',
    //   firstName: '',
    //   gender: '',
    //   cityOfResidence: '',
    //   weight: '',
    //   birthDate: '',
    //   motivation: '',
    // });
    if (citySelected !== '') {
      profile.cityOfResidence = citySelected.value;
    }
    if (cityToBeAdded !== '') {
      profile.cityOfResidence = cityToBeAdded;
      /* fetch to cities db to add new city */
    }
    // setFormWasValidated(false);
    // const isValid = isFormValid();
    // if (isValid) {
    console.log('profile', profile);
    // console.log('citySelected', citySelected);
    // console.log('cityToBeAdded', cityToBeAdded);
    await fetch(`${REACT_APP_SERVER_URL}/api/user/${loggedInUser.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
      // body: JSON.stringify({
      //   userName: profile.userName,
      //   password: profile.password,
      //   email: profile.email,
      //   firstName: profile.firstName,
      //   lastName: profile.lastName,
      //   gender: profile.gender,
      //   cityOfResidence: citySelected,
      //   weight: profile.weight,
      //   birthDate: profile.birthDate,
      //   motivation: profile.motivation,
      // }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          setTimeout(() => {
            setAlert({ alertType: 'success', message: messageTypes.success });
          }, 3000);
          setProfile({
            userName: '',
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            gender: '',
            cityOfResidence: '',
            weight: '',
            birthDate: '',
            motivation: '',
          });
          setCitySelected('');
          setCityToBeAdded('');
          console.log('új adatok sikeresen mentve');
        } else {
          setAlert({ alertType: 'danger', message: messageTypes.fail });
          console.log('új adatok mentése sikertelen');
        }
      });
    // } else {
    //   setFormWasValidated(true);
    // }
  };

  return (
    <>
      <div className='profile-edit-cont'>
        <h2>Profil módosítása</h2>
        {/* <p>{profile.lastName}</p>
        <p>{profile.firstName}</p>
        <p>{profile.email}</p> */}
        <hr />
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>
        <form
          noValidate
          onSubmit={handleSubmit}
          // className={`needs-validation ${formWasValidated && 'was-validated'}`}
        >
          <div className='input'>
            <InputField
              name='userName'
              type='text'
              labelText='Felhasználónév'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.userName}
              // reference={references.userName}
              // formError={formErrors.userName}
            />
            <InputField
              name='lastName'
              type='text'
              labelText='Vezetéknév'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.lastName}
              // reference={references.lastName}
              // formError={formErrors.lastName}
            />
            <InputField
              name='firstName'
              type='text'
              labelText='Keresztnév'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.firstName}
              // reference={references.firstName}
              // formError={formErrors.firstName}
            />
            <InputField
              name='email'
              type='email'
              labelText='Email'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.email}
              // reference={references.email}
              // formError={formErrors.email}
            />
            <InputField
              name='password'
              type='password'
              labelText='Jelszó'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.password}
              // reference={references.password}
              // formError={formErrors.password}
            />
            <SelectField
              labelText='Nem'
              name='gender'
              id='gender'
              valueList={genderList}
              onChange={handleInputChange}
              value={profile.gender}
              // reference={references.gender}
              // formError={formErrors.gender}
            />
            {/* <SelectField
              labelText='Tartózkodási hely'
              name='cityOfResidence'
              id='cityOfResidence'
              valueList={cities}
              onChange={handleInputChange}
              value={profile.cityOfResidence}
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
              value={profile.weight}
              // reference={references.weight}
              // formError={formErrors.weight}
            />
            <InputField
              name='birthDate'
              type='date'
              labelText='Születési dátum'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.birthDate}
              // reference={references.birthDate}
              // formError={formErrors.birthDate}
            />
            <InputField
              name='motivation'
              type='motivation'
              labelText='Motivációs szöveg'
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              value={profile.motivation}
              // reference={references.motivation}
              // formError={formErrors.motivation}
            />
          </div>
          <button type='submit' className='profile-edit-btn'>
            MENTÉS
          </button>
        </form>

        {/* {cities.map(city => (
          <div className='card-cont' key={city._id}>
            <p>{city.name}</p>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default EditProfile;
