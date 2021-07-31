import { useState, useRef, useEffect } from 'react';
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
    newPassword: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);
  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    email: useRef(),
    newPassword: useRef(),
    confirmPassword: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    passwordLength: `A jelszó legalább 8 karakter hosszú kell legyen`,
    validEmail: `Nem megfelelő email formátum`,
    passwordMatch: `A megadott jelszavak nem egyeznek.`,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const messageTypes = Object.freeze({
    // success: `A jelszó cseréje sikeresen megtörtént.`,
    fail: `A jelszó cseréje nem sikerült.`,
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

  const isConfirmPasswordMatch = value => {
    return value === formData.newPassword;
  };

  const validators = {
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
    },
    newPassword: {
      required: isFieldEmpty,
      passwordLength: isPasswordValid,
    },
    confirmPassword: {
      required: isFieldEmpty,
      passwordLength: isPasswordValid,
      passwordMatch: isConfirmPasswordMatch,
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
      newPassword: '',
      confirmPassword: '',
    });

    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid && verified) {
      await fetch(`${REACT_APP_SERVER_URL}/api/user/password`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.newPassword,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            // console.log('cooooool');
            // setAlert({ alertType: 'success', message: messageTypes.success });
            setFormData({
              email: '',
              newPassword: '',
              confirmPassword: '',
            });
            setVerified(false);
            setAlert(null);
            // setTimeout(() => {
            history.push('/login');
            // }, 3000);
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
      <div className='alert-cont'>
        {alert && (
          <p className={`alert alert-${alert.alertType}`}>{alert.message}</p>
        )}
      </div>
      <div className='password-cont'>
        <h2>Elfelejtett jelszó</h2>
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
            <InputField
              name='newPassword'
              type='password'
              labelText='Új jelszó - (legalább 8 karakter)'
              value={formData.newPassword}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.newPassword}
              error={formErrors.newPassword}
            />
            <InputField
              name='confirmPassword'
              type='password'
              labelText='Jelszó még egyszer'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.confirmPassword}
              error={formErrors.confirmPassword}
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
