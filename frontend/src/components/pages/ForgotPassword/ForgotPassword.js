import { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';
import Navbar from '../../common/Navbar/Navbar';
import Footer from '../../common/Footer/Footer';
import InputField from '../../common/InputField/InputField';
import './forgotPassword.scss';

const ForgotPassword = () => {
  const { REACT_APP_SERVER_URL, REACT_APP_GOOGLE_RECAPTCHA_KEY } = process.env;
  const [verified, setVerified] = useState(false);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    email: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    validEmail: `Nem megfelelő email formátum`,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
  });

  const messageTypes = Object.freeze({
    success: `A jelszó cseréjéhez kérlek nyitsd meg az e-mailt amit küldtünk.`,
    fail: `A megadott e-mail nem szerepel a regisztrált felhasználók között.`,
    failCaptcha: `Kérlek bizonyítsd be hogy nem vagy robot 🤖`,
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isEmailInvalid = value => {
    return validator.isEmail(value);
  };

  const validators = {
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
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

  const onChange = () => {
    setVerified(true);
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

  const handleReset = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      email: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid && verified) {
      await fetch(`${REACT_APP_SERVER_URL}/api/password`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            window.scrollTo(0, 0);
            setFormData({
              email: '',
            });
            setVerified(false);
            setAlert({ alertType: 'success', message: messageTypes.success });
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
          }
        });
    } else if (!verified  && isValid) {
      setAlert({
        alertType: 'danger',
        message: messageTypes.failCaptcha,
      });
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className='password-cont'>
        <h2>Elfelejtett jelszó</h2>
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>
        <form
          noValidate
          onSubmit={handleReset}
          className={`needs-validation ${formWasValidated && 'was-validated'}`}
        >
          <div className='input'>
            <InputField
              name='email'
              type='email'
              value={formData.email}
              labelText='Email cím'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.email}
              error={formErrors.email}
            />
            <div className='captcha'>
              <ReCAPTCHA
                className='captcha'
                sitekey={REACT_APP_GOOGLE_RECAPTCHA_KEY}
                onChange={onChange}
              />
            </div>
          </div>
          <button type='submit' className='password-btn'>
            KÜLDÉS
          </button>
          <p>
            <Link to='/' className='text-link'>
              Vissza a főoldalra
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
