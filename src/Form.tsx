import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import './App.scss';

export const Form: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setEmail(value);

    if (!value) {
      setEmailError('Email is required.');
    } else if (!value.includes('@')) {
      setEmailError('Email must be valid.');
    } else {
      setEmailError('');
    }
  };

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);

  const [hearAbout, setHearAbout] = useState<'' | 'Brandfolder' | 'Smartsheet'>('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const handleName = (e: ChangeEvent<HTMLInputElement>, type: 'firstName' | 'lastName') => {
    const { value } = e.target;

    if (type === 'firstName') {
      setFirstName(value);

      if (!value) {
        setFirstNameError('First name is required.');
      } else {
        setFirstNameError('');
      }
    } else {
      setLastName(value);

      if (!value) {
        setLastNameError('Last name is required.');
      } else {
        setLastNameError('');
      }
    }
  };

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPassword(value);

    if (!value) {
      setPasswordError('Password is required.');
    } else if (value.length < 9) {
      setPasswordError('Password must be a minimum of 8 characters.');
    } else if (value.search(/[0-9]/g) < 0) {
      setPasswordError('Password must contain at least one number.');
    } else if (value.search(/[!#$%&?]/g) < 0) {
      setPasswordError('Password must contain at least one of !#$%&? special characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleBlur = (type: 'email' | 'firstName' | 'lastName' | 'password') => {
    if (type === 'email') {
      setEmailTouched(true);
    } else if (type === 'firstName') {
      setFirstNameTouched(true);
    } else if (type === 'lastName') {
      setLastNameTouched(true);
    } else {
      setPasswordTouched(true);
    }
  };

  const [optin, setOptin] = useState(false);

  const hasEmail = !!email && !emailError && emailTouched;
  const hasFirstName = !!firstName && !firstNameError && firstNameTouched;
  const hasLastName = !!lastName && !lastNameError && lastNameTouched;
  const hasPassword = !!password && !passwordError && passwordTouched;

  const canSubmit = hasEmail && hasFirstName && hasLastName && hasPassword;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      firstName,
      hearAbout,
      lastName,
      optin,
      password
    });
  };

  return (
    <div className="page">
      <h1 className="h1">Sign Up</h1>
      <p className="p">All fields are required.</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="field">
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="input"
            id="firstName"
            name="firstName"
            onBlur={() => handleBlur('firstName')}
            onChange={e => handleName(e, 'firstName')}
            required={true}
            type="text"
            value={firstName}
          />
          {firstNameError && firstNameTouched && <p className="error">{firstNameError}</p>}
        </div>
        <div className="field">
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="input"
            id="lastName"
            name="lastName"
            onBlur={() => handleBlur('lastName')}
            onChange={e => handleName(e, 'lastName')}
            required={true}
            type="text"
            value={lastName}
          />
          {lastNameError && lastNameTouched && <p className="error">{lastNameError}</p>}
        </div>
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            name="email"
            onBlur={() => handleBlur('email')}
            onChange={e => handleEmail(e)}
            required={true}
            type="email"
            value={email}
          />
          {emailError && emailTouched && <p className="error">{emailError}</p>}
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            id="password"
            name="password"
            onBlur={() => handleBlur('password')}
            onChange={e => handlePassword(e)}
            required={true}
            type={passwordShow ? 'text' : 'password'}
            value={password}
          />
          <button className="showPassword" onClick={() => setPasswordShow(!passwordShow)} type="button">
            {passwordShow ? 'Hide' : 'Show'} password
          </button>
          {passwordError && passwordTouched && <p className="error">{passwordError}</p>}
        </div>
        <div className="field">
          <div className="checkbox">
            <input
              checked={optin}
              className="check"
              id="optin"
              name="optin"
              onChange={e => setOptin(e.target.checked)}
              type="checkbox"
            />
            <label className="label" htmlFor="optin">
              I&rsquo;d like to receive emails
            </label>
          </div>
        </div>
        <div className="field">
          <div className="radio-group">
            Where did you hear about us?
            <div className="radios">
              <label className="label" htmlFor="brandfolder">
                <input
                  checked={hearAbout === 'Brandfolder'}
                  className="radio"
                  id="brandfolder"
                  name="hearAbout"
                  onChange={e => setHearAbout('Brandfolder')}
                  type="radio"
                />
                Brandfolder
              </label>
              <label className="label" htmlFor="smartsheet">
                <input
                  checked={hearAbout === 'Smartsheet'}
                  className="radio"
                  id="smartsheet"
                  name="hearAbout"
                  onChange={e => setHearAbout('Smartsheet')}
                  type="radio"
                />
                Smartsheet
              </label>
            </div>
          </div>
        </div>
        <button className="submit" disabled={!canSubmit} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};
