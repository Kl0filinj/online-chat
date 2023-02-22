import * as Yup from 'yup';

const regexPassword = /^\S*$/;
const regexName = /^([a-zA-Zа-яА-ЯёЁ]+)$/;
const regexEmail = /^[^-][a-zA-Z0-9_.-]{1,64}@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const loginYupSchema = Yup.object({
  email: Yup.string().email('Invalid email adress').required('Required'),
  password: Yup.string()
    .min(7, 'Must be 7 characters or more')
    .max(32, 'Must be 32 characters or less')
    .matches(regexPassword, 'Must not contain spaces')
    .required('Required'),
});

export const regesterYupSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email adress')
    .required('Required')
    .min(10)
    .max(63)
    .matches(regexEmail, 'Invalid email adress'),
  password: Yup.string()
    .min(7, 'Must be 7 characters or more')
    .max(32, 'Must be 32 characters or less')
    .matches(regexPassword, 'Must not contain spaces')
    .required('Required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Required'),
  name: Yup.string().matches(regexName, 'Name must contain only letters'),
});
