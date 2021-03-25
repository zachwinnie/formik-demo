import { Field, Form, Formik } from 'formik';
import { FunctionComponent, useState } from 'react';
import { boolean, mixed, object, SchemaOf, string } from 'yup';
import './App.scss';

interface FormikFormValues {
  email: string;
  firstName: string;
  hearAbout: '' | 'Brandfolder' | 'Smartsheet';
  lastName: string;
  middleName: string | undefined;
  optin: boolean;
  password: string;
}

const initialValues: FormikFormValues = {
  email: '',
  firstName: '',
  hearAbout: '',
  lastName: '',
  middleName: '',
  optin: false,
  password: ''
};

const validationSchema: SchemaOf<FormikFormValues> = object().shape({
  email: string().email('Email must be valid.').required('Email is required.'),
  firstName: string().required('First name is required.'),
  hearAbout: mixed().oneOf(['', 'Brandfolder', 'Smartsheet']),
  lastName: string().required('Last name is required.'),
  middleName: string(),
  optin: boolean().required(),
  password: string()
    .required('Password is required.')
    .min(8, 'Password must be a minimum of 8 characters.')
    .matches(/[0-9]/g, 'Password must contain at least one number.')
    .matches(/[!#$%&?]/g, 'Password must contain at least one of !#$%&? special characters.')
});

export const FormikForm: FunctionComponent = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <div className="page">
      <h1 className="h1">Sign Up</h1>
      <p className="p">All fields are required.</p>
      <Formik
        initialValues={initialValues}
        isInitialValid={false}
        onSubmit={values => {
          console.log({ values });
        }}
        validationSchema={validationSchema}>
        {({ errors, isValid, touched, values }) => (
          <Form className="form">
            <div className="field">
              <label className="label" htmlFor="firstName">
                First Name
              </label>
              <Field className="input" id="firstName" name="firstName" required={true} type="text" />
              {errors.firstName && touched.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="field">
              <label className="label" htmlFor="lastName">
                Last Name
              </label>
              <Field className="input" id="lastName" name="lastName" required={true} type="text" />
              {errors.lastName && touched.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <Field className="input" id="email" name="email" required={true} type="email" />
              {errors.email && touched.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <Field
                className="input"
                id="password"
                name="password"
                required={true}
                type={passwordShow ? 'text' : 'password'}
              />
              <button className="showPassword" onClick={() => setPasswordShow(!passwordShow)} type="button">
                {passwordShow ? 'Hide' : 'Show'} password
              </button>
              {errors.password && touched.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="field">
              <div className="checkbox">
                <Field className="check" id="optin" name="optin" type="checkbox" />
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
                    <Field className="radio" id="brandfolder" name="hearAbout" type="radio" value="Brandfolder" />
                    Brandfolder
                  </label>
                  <label className="label" htmlFor="smartsheet">
                    <Field className="radio" id="smartsheet" name="hearAbout" type="radio" value="Smartsheet" />
                    Smartsheet
                  </label>
                </div>
              </div>
            </div>
            <button className="submit" disabled={!isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
