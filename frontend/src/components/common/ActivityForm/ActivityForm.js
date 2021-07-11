import { useState, useRef } from 'react';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import './activityForm.scss';

/* TO-DO
select field does not validate on blur */
const ActivityForm = ({ type, selectedActivity }) => {
  const { REACT_APP_SERVER_URL } = process.env;

  const activity = selectedActivity;
  const id = type === 'edit' ? activity.id : null;

  const activityTypeList = ['futás', 'kerékpározás', 'úszás'];

  const [formData, setFormData] = useState(
    type === 'edit'
      ? activity
      : {
          //   activityStartDateAndTime: '',
          duration: '',
          activityType: '',
          distance: '',
          comment: '',
        }
  );

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    // activityStartDateAndTime: useRef(),
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
    // activityStartDateAndTime: '',
    duration: '',
    activityType: '',
    distance: '',
    comment: '',
  });

  const messageTypes = Object.freeze({
    modifySuccess: `Sikeres módosítás. A tevékenység frissítésre került az adatbázisban`,
    createSuccess: `Sikeres mentés. Az új tevékenységet hozzádtuk az adatbázishoz`,
    modifyFail: `Sikertelen módosítás. Adatbázis probléma.`,
    createFail: `Sikertelen mentés. Adatbázis probléma.`,
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isValueNegative = value => {
    return value >= 0;
  };

  //   const isDateExpired = value => {
  //     const expiryDate = new Date(value);
  //     const actualDate = new Date();
  //     return expiryDate >= actualDate;
  //   };

  //   const isDate = value => {
  //     const dateString = new Date(value).toString();
  //     return dateString !== 'Invalid Date';
  //   };

  const validators = {
    // activityStartDateAndTime: {
    //   required: isFieldEmpty,
    //     isDate,
    //     isDateExpired,
    // },
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

  const handleSubmit = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      //   activityStartDateAndTime: '',
      duration: '',
      activityType: '',
      distance: '',
      comment: '',
    });
    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      if (type === 'new') {
        await fetch(`${REACT_APP_SERVER_URL}/api/activities`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
                setAlert({
                  alertType: 'success',
                  message: messageTypes.createSuccess,
                });
              }, 3000);
              setFormData({
                // activityStartDateAndTime: '',
                duration: '',
                activityType: '',
                distance: '',
                comment: '',
              });
              console.log('új tevékenység sikeresen elmentve');
            } else {
              setAlert({
                alertType: 'danger',
                message: messageTypes.createFail,
              });
              console.log('új tevékenység mentése sikertelen');
            }
          });
      }
      if (type === 'edit') {
        console.log(formData);
        await fetch(`${REACT_APP_SERVER_URL}/api/activities/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
                setAlert({
                  alertType: 'success',
                  message: messageTypes.modifySuccess,
                });
              }, 3000);
              setFormData({
                // activityStartDateAndTime: '',
                duration: '',
                activityType: '',
                distance: '',
                comment: '',
              });
              console.log('tevékenység sikeresen frissítve');
            } else {
              setAlert({
                alertType: 'danger',
                message: messageTypes.modifyFail,
              });
              console.log('tevékenység frissítése sikertelen');
            }
          });
      }
      setFormWasValidated(false);
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <>
      <div className='activity-form-cont'>
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
            {/* <InputField
              name='activityStartDateAndTime'
              type='date'
              labelText='Kezdet (dátum / idő)'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              formvalue={formData.activityStartDateAndTime}
              reference={references.activityStartDateAndTime}
              formError={formErrors.activityStartDateAndTime}
            /> */}
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
              id='activityType'
              name='activityType'
              labelText='Típus'
              valueList={activityTypeList}
              onChange={handleInputChange}
              // onBlur={handleInputBlur}
              formvalue={formData.activityType}
              reference={references.activityType}
              formError={formErrors.activityType}
            />
            <InputField
              name='distance'
              type='number'
              labelText='Távolság (méter)'
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

export default ActivityForm;
