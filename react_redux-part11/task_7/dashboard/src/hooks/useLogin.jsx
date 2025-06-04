import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const useLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [enableSubmit, setEnableSubmit] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      email,
    }));
    setEnableSubmit(validateEmail(email) && formData.password.length >= 8);
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password,
    }));
    setEnableSubmit(validateEmail(formData.email) && password.length >= 8);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(login({ email, password }));
  };

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
};

export default useLogin;
