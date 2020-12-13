import * as Yup from 'yup';

const formValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required('required'),
    password: Yup.string().required('required'),
  });
};

export default formValidationSchema;
