import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import { BrowserRouter as Link } from 'react-router-dom';
import validator from 'validator';
import Navbar from '../../common/Navbar/Navbar';
import Footer from '../../common/Footer/Footer';
import InputField from '../../common/InputField/InputField';
import './register.scss';

const Register = () => {
  const { REACT_APP_SERVER_URL } = process.env;

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
    passwordLength: `A jelszó legalább 6 karakter hosszú kell legyen`,
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
    if (isValid) {
      await fetch(`${REACT_APP_SERVER_URL}/api/register`, {
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
            setTimeout(() => {
              history.push('/login');
            }, 3000);
            console.log('sikeres regisztráció');
          } else {
            setAlert({ alertType: 'danger', message: messageTypes.fail });
            console.log('regisztrációs hiba történt');
          }
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
              labelText='Jelszó'
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.password}
              error={formErrors.password}
            />
          </div>
          <button type='submit' className='register-btn'>
            REGISZTRÁCÓ
          </button>
          {/* <Link to='/login' className='link'>
            <button type='button' className='link-btn'>
              Már regisztráltál? Itt bejelentkezhetsz
            </button>
          </Link> */}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
