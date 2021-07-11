import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import hu from 'date-fns/locale/hu';
import InputField from '../../common/InputField/InputField';
import SelectField from '../../common/SelectField/SelectField';
import './newActivity.scss';

const NewActivity = () => {
  const { REACT_APP_SERVER_URL } = process.env;

  // const [activityStartDateAndTime, setActivityStartDateAndTime] = useState(
  //   new Date()
  // );
  // registerLocale('hu', hu);

  const activityTypeList = ['futás', 'kerékpározás', 'úszás'];

  const [formData, setFormData] = useState({
    activityStartDateAndTime: '',
    duration: '',
    activityType: '',
    distance: '',
    comment: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    activityStartDateAndTime: useRef(),
    duration: useRef(),
    activityType: useRef(),
    distance: useRef(),
    comment: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    positive: `A megadott érték nem lehet negativ.`,
  });

  const [formErrors, setFormErrors] = useState({
    activityStartDateAndTime: '',
    duration: '',
    activityType: '',
    distance: '',
    comment: '',
  });

  const messageTypes = Object.freeze({
    success: `Sikeres mentés. A tevékenységet hozzádtuk az adatbázishoz`,
    fail: `Sikertelen mentés. Adatbázis probléma.`,
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isValueNegative = value => {
    return value >= 0;
  };

  const validators = {
    activityStartDateAndTime: {
      required: isFieldEmpty,
    },
    duration: {
      required: isFieldEmpty,
      positive: isValueNegative,
    },
    activityType: {
      required: isFieldEmpty,
    },
    distance: {
      required: isFieldEmpty,
      positive: isValueNegative,
    },
    comment: {
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
    references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputBlur = e => {
    const { name } = e.target;
    validateField(name);
  };

  const handleRegister = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      activityStartDateAndTime: '',
      duration: '',
      activityType: '',
      distance: '',
      comment: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      // console.log(formData, activityStartDateAndTime.toJSON());
      // const ASDAT = {
      //   activityStartDateAndTime: activityStartDateAndTime.toJSON(),
      // };
      // console.log(ASDAT);
      await fetch(`${REACT_APP_SERVER_URL}/api/activities`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // activityStartDateAndTime: ASDAT,
          activityStartDateAndTime: formData.activityStartDateAndTime,
          duration: formData.duration,
          activityType: formData.activityType,
          distance: formData.distance,
          comment: formData.comment,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            setTimeout(() => {
              setAlert({ alertType: 'success', message: messageTypes.success });
            }, 3000);
            setFormData({
              activityStartDateAndTime: '',
              duration: '',
              activityType: '',
              distance: '',
              comment: '',
            });
            // setActivityStartDateAndTime(new Date());
            console.log('új tevékenység sikeresen mentve');
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
            console.log('új tevékenység mentése sikertelen');
          }
        });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <>
      <div className='new-activity-cont'>
        <h2>Új tevékenység hozzáadása</h2>
        <hr />
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>
        <form
          noValidate
          onSubmit={handleRegister}
          className={`needs-validation ${formWasValidated && 'was-validated'}`}
        >
          <div className='input'>
            {/* <div className='activityStartDateAndTime'>
              <label className='form-label' htmlFor='activityStartDateAndTime'>
                Kezdet (dátum / idő)
              </label>
              <DatePicker
                className='form-control'
                // autoComplete='off'
                id='activityStartDateAndTime'
                selected={activityStartDateAndTime}
                // selected={formData.activityStartDateAndTime}
                // onChange={handleInputChange}
                // name='activityStartDateAndTime'
                onChange={date => setActivityStartDateAndTime(date)}
                showTimeSelect
                dateFormat='Pp'
                locale='hu'
                // formvalue={formData.activityStartDateAndTime}
                // reference={references.activityStartDateAndTime}
                // error={formErrors.activityStartDateAndTime}
              />
            </div> */}
            <InputField
              name='activityStartDateAndTime'
              type='date'
              labelText='Kezdet (dátum / idő)'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              formvalue={formData.activityStartDateAndTime}
              reference={references.activityStartDateAndTime}
              formError={formErrors.activityStartDateAndTime}
            />
            <InputField
              name='duration'
              type='number'
              labelText='Időtartam (perc)'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              formvalue={formData.duration}
              reference={references.duration}
              formError={formErrors.duration}
            />
            <SelectField
              labelText='Típus'
              name='activityType'
              id='activityType'
              valueList={activityTypeList}
              onChange={handleInputChange}
              formvalue={formData.activityType}
              reference={references.activityType}
              formError={formErrors.activityType}
            />
            <InputField
              name='distance'
              type='number'
              labelText='Távolság (m)'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              formvalue={formData.distance}
              reference={references.distance}
              formError={formErrors.distance}
            />
            <InputField
              name='comment'
              type='comment'
              labelText='Megjegyzés'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              formvalue={formData.comment}
              reference={references.comment}
              formError={formErrors.comment}
            />
          </div>
          <button type='submit' className='custom-btn'>
            MENTÉS
          </button>
          {/* <Link to='/login' className='link'>
            <button type='button' className='link-btn'>
              Már regisztráltál? Itt bejelentkezhetsz
            </button>
          </Link> */}
        </form>
      </div>
    </>
  );
};

export default NewActivity;
