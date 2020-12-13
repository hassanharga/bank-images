import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../../components/Input/Input';
import { register } from '../../store/actions';
import formValidationSchema from './FormValidation';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className=''>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={({ email, password }) => {
          //   console.log('values', values);
          dispatch(register(email, password, history));
        }}
        validationSchema={formValidationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <InputField name='email' label='Email' className='form-control' />
            </div>
            <div className='form-group'>
              <InputField
                name='password'
                type='password'
                label='Password'
                className='form-control'
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
