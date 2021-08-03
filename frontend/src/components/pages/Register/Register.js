import { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';
import Navbar from '../../common/Navbar/Navbar';
import Footer from '../../common/Footer/Footer';
import InputField from '../../common/InputField/InputField';
import './register.scss';

const Register = () => {
  const { REACT_APP_SERVER_URL, REACT_APP_GOOGLE_RECAPTCHA_KEY } = process.env;

  const [verified, setVerified] = useState(false);
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    passwordLength: `A jelszó legalább 8 karakter hosszú kell legyen`,
    validEmail: `Nem megfelelő email formátum`,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const messageTypes = Object.freeze({
    success: `Sikeres regisztráció. Máris átirányítunk a bejelentkezés oldalra.`,
    fail: `Sikertelen regisztráció. Az általad megadott adat/adatok már szerepelnek az adatbázisban.`,
    failCaptcha: `Kérlek bizonyítsd be hogy nem vagy robot 🤖`,
  });

  const isFieldEmpty = value => {
    return value !== '';
  };

  const isEmailInvalid = value => {
    return validator.isEmail(value);
  };

  const isPasswordValid = value => {
    return value.length >= 8;
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

  const handleRegister = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid && verified) {
      await fetch(`${REACT_APP_SERVER_URL}/api/user`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            setAlert({ alertType: 'success', message: messageTypes.success });
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            });
            setVerified(false);
            setTimeout(() => {
              history.push('/login');
            }, 2000);
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
          }
        });
    } else if (!verified) {
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
      <div className='register-cont'>
        <h2>Regisztráció</h2>
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
            <InputField
              name='lastName'
              type='text'
              labelText='Vezetéknév'
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.lastName}
              error={formErrors.lastName}
            />
            <InputField
              name='firstName'
              type='text'
              labelText='Keresztnév'
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.firstName}
              error={formErrors.firstName}
            />
            <InputField
              name='email'
              type='email'
              labelText='Email cím'
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.email}
              error={formErrors.email}
            />
            <InputField
              name='password'
              type='password'
              labelText='Jelszó - (legalább 8 karakter)'
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.password}
              error={formErrors.password}
            />
            <div className='captcha'>
              <ReCAPTCHA
                sitekey={REACT_APP_GOOGLE_RECAPTCHA_KEY}
                onChange={onChange}
              />
            </div>
          </div>
          <p>
            <Link to='/login' className='text-link'>
              Már regisztráltál? Itt bejelentkezhetsz.
            </Link>
          </p>
          <button type='submit' className='register-btn'>
            REGISZTRÁCÓ
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
