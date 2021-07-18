import React, { useState, useRef } from 'react';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import './activityForm.scss';

/* TO-DO !!!
- select field does not validate on blur 
- form doesn't load data in edit mode
- validation not perfect, perhaps date validation should be added
*/
const ActivityForm = props => {
  const { type, activity } = props;
  // console.log('ActivityForm-props', activity);

  const { REACT_APP_SERVER_URL } = process.env;
  const id = type === 'edit' ? activity._id : null;

  // console.log('props', activityDate);

  const activityTypeList = ['futás', 'kerékpározás', 'úszás'];

  const [formData, setFormData] = useState(
    type === 'edit'
      ? activity
      : {
          activityDate: '',
          activityTime: '',
          duration: '',
          activityType: '',
          distance: '',
          comment: '',
          // photoUrl: '',
        }
  );
  // console.log('formData', formData);

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    activityDate: useRef(),
    activityTime: useRef(),
    duration: useRef(),
    activityType: useRef(),
    distance: useRef(),
    comment: useRef(),
    // photoUrl: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    positive: `A megadott érték nem lehet negativ.`,
  });

  const [formErrors, setFormErrors] = useState({
    activityDate: '',
    activityTime: '',
    duration: '',
    activityType: '',
    distance: '',
    comment: '',
    // photoUrl: '',
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

  // const isValueNegative = value => {
  //   return value >= 0;
  // };

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
    activityDate: {
      required: isFieldEmpty,
    },
    activityTime: {
      required: isFieldEmpty,
    },
    duration: {
      required: isFieldEmpty,
      // positive: isValueNegative,
    },
    activityType: {
      required: isFieldEmpty,
    },
    distance: {
      required: isFieldEmpty,
      // positive: isValueNegative,
    },
    comment: {
      required: isFieldEmpty,
    },
    // photoUrl: {
    //   required: isFieldEmpty,
    // },
  };

  const validateField = fieldName => {
    if (fieldName === '_id') return true;

    const value = formData[fieldName];
    let isValid = true;
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: '',
    }));
    // if (type === 'new') {
    //   references[fieldName].current.setCustomValidity('');
    // }
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
  // const isFormValid = () => {
  //   let isValid = true;
  //   Object.keys(formData).forEach(fieldName => {
  //     const isFieldValid = validateField(fieldName);
  //     if (!isFieldValid) {
  //       isValid = false;
  //     }
  //   });
  //   return isValid;
  // };

  const handleInputChange = e => {
    const { name, value } = e.target;
    console.log('e.target.value', e.target.value);
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
      activityDate: '',
      activityTime: '',
      duration: '',
      activityType: '',
      distance: '',
      comment: '',
      // photoUrl: '',
    });
    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      console.log('new - handleSubmit', formData.activityDate);
      if (type === 'new') {
        await fetch(`${REACT_APP_SERVER_URL}/api/activities`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(formData),
        })
          // .then(response => response.json())
          .then(res => {
            if (res.status >= 200 && res.status < 300) {
              setAlert({
                alertType: 'success',
                message: messageTypes.createSuccess,
              });
              setFormData({
                activityDate: '',
                activityTime: '',
                duration: '',
                activityType: '',
                distance: '',
                comment: '',
                // photoUrl: '',
              });
              e.target.reset();
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
        console.log(
          'formData - handleSubmit',
          formData
          // new Date(formData.activityDate).toISOString()
        );
        console.log('edit - handleSubmit', formData);

        await fetch(`${REACT_APP_SERVER_URL}/api/activities/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(
            /* formData */ {
              // activityDate: new Date(formData.activityDate).toISOString(),
              activityDate: formData.activityDate,
              activityTime: formData.activityTime,
              duration: formData.duration,
              activityType: formData.activityType,
              distance: formData.distance,
              comment: formData.comment,
              // photoUrl: formData.photoUrl,
            }
          ),
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
            <InputField
              name='activityDate'
              id='activityDate'
              type='date'
              labelText='Dátum'
              placeholder={'ÉÉ/HH/NN'}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.activityDate}
              reference={references.activityDate}
              error={formErrors.activityDate}
            />
            <InputField
              name='activityTime'
              id='activityTime'
              type='time'
              labelText='Idő'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.activityTime}
              reference={references.activityTime}
              error={formErrors.activityTime}
            />
            <InputField
              name='duration'
              id='duration'
              type='number'
              labelText='Időtartam (perc)'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.duration}
              reference={references.duration}
              error={formErrors.duration}
            />
            {type === 'new' ? (
              <SelectField
                name='activityType'
                id='activityType'
                labelText='Típus'
                valueList={activityTypeList}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={formData.activityType}
                reference={references.activityType}
                error={formErrors.activityType}
              />
            ) : (
              <>
                <label className='form-label m-2' htmlFor='activityType'>
                  Típus
                </label>
                <select
                  className='form-select m-2'
                  id='activityType'
                  name='activityType'
                  value={formData.activityType}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  reference={references.activityType}
                  error={formErrors.activityType}
                >
                  {activityTypeList.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </>
            )}
            <InputField
              name='distance'
              id='distance'
              type='number'
              labelText='Távolság (méter)'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.distance}
              reference={references.distance}
              error={formErrors.distance}
            />
            <InputField
              name='comment'
              id='comment'
              type='comment'
              labelText='Megjegyzés'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.comment}
              reference={references.comment}
              error={formErrors.comment}
            />
            {/* <InputField
              name='photoUrl'
              id='photoUrl'
              type='file'
              labelText='Fotó'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={formData.photoUrl}
              reference={references.photoUrl}
              error={formErrors.photoUrl}
            /> */}
          </div>
          <button type='submit' className='custom-btn'>
            MENTÉS
          </button>
        </form>
      </div>
    </>
  );
};

export default ActivityForm;
