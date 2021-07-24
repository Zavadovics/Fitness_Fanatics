import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';
import Navbar from '../../common/Navbar/Navbar';
import Footer from '../../common/Footer/Footer';
import InputField from '../../common/InputField/InputField';
import './login.scss';

const Login = ({ loggedInUser, setLoggedInUser }) => {
  const { REACT_APP_SERVER_URL, REACT_APP_GOOGLE_RECAPTCHA_KEY } = process.env;
  const [verified, setVerified] = useState(false);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    passwordLength: `A jelszó legalább 6 karakter hosszú kell legyen`,
    validEmail: `Nem megfelelő email formátum`,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const messageTypes = Object.freeze({
    fail: `Az általad megadott email cím vagy jelszó helytelen.`,
    failCaptcha: `Kérlek bizonyítsd be hogy nem vagy robot 🤖`,
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

  const handleLogin = async e => {
    e.preventDefault();
    setAlert(null);
    setFormErrors({
      email: '',
      password: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid && verified) {
      console.log('verified');
      await fetch(`${REACT_APP_SERVER_URL}/api/login`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status >= 200 && res.status < 300) {
            const user = res;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setFormData({
              email: '',
              password: '',
            });
            setVerified(false);
            setAlert(null);
            history.push('/activities');
            window.location.reload();
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
          }
        });
    } else if (!verified) {
      console.log('not verified');
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
      <Navbar setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      <div className='login-cont'>
        <h2>Bejelentkezés</h2>
        <hr />
        <div className='alert-cont'>
          {alert && (
            <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
          )}
        </div>

        <form
          noValidate
          onSubmit={handleLogin}
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
            <InputField
              name='password'
              type='password'
              value={formData.password}
              labelText='Jelszó'
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.password}
              error={formErrors.password}
            />
            <div className='captcha'>
              <ReCAPTCHA
                className='captcha'
                sitekey={REACT_APP_GOOGLE_RECAPTCHA_KEY}
                onChange={onChange}
              />
            </div>
          </div>
          <button type='submit' className='custom-btn'>
            BEJELENTKEZÉS
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
