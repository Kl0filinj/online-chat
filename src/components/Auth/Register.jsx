import { Box, Button, Heading, Text } from '@chakra-ui/react';
import CustomInput from 'components/sheared/CustomInput';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, register } from 'redux/auth/auth-operations';
import { isRefreshingSelector } from 'redux/auth/auth-selector';
import { regesterYupSchema } from 'utils/validationSchemas/validationSchemas';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const isRefreshing = useSelector(isRefreshingSelector);

  const handleClick = name => {
    name === 'password'
      ? setShowPassword(prevState => !prevState)
      : setShowConfirmPassword(prevState => !prevState);
  };

  const initialValues = {
    email: '',
    name: '',
    password: '',
    confirm: '',
  };

  const onSubmit = async values => {
    const registerData = {
      email: values.email,
      password: values.password,
      name: values.name,
    };
    const data = await dispatch(register(registerData));
    if (data.type === 'auth/register/fulfilled') {
      dispatch(login({ email: values.email, password: values.password }));
    }
  };

  return (
    <Box>
      <Heading
        color={'#ffffff'}
        textShadow={
          '    0 0 1px #fff,    0 0 2px #fff,    0 0 5px #fff,    0 0 11px #ae00ff,    0 0 20px #ae00ff,    0 0 30px #ae00ff,    0 0 55px #ae00ff,    0 0 80px #ae00ff'
        }
      >
        CREATE NEW ACCOUNT
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={regesterYupSchema}
        onSubmit={onSubmit}
        isSubmitting
      >
        {formik => (
          <Box
            as={Form}
            width={{ base: '280px', md: '448px', xl: '458px' }}
            mx={'auto'}
            my={'10'}
          >
            <CustomInput
              type="email"
              name="email"
              id="reg-email"
              placeholder="Email"
            />
            <CustomInput
              type="text"
              name="name"
              id="reg-name"
              placeholder="Name"
            />
            <CustomInput
              type="password"
              handleClick={() => handleClick('password')}
              show={showPassword}
              name="password"
              id="reg-password"
              placeholder="Password"
            />
            <CustomInput
              type="password"
              handleClick={handleClick}
              show={showConfirmPassword}
              name="confirm"
              id="reg-confirm-password"
              placeholder="Confirm Password"
            />

            <Button
              isDisabled={formik.isSubmitting}
              colorScheme="purple"
              type="submit"
              controle="secondary"
              mb="40px"
              h={{ base: '44px', xl: '48px' }}
              width={{ base: '280px', md: '448px', xl: '458px' }}
              isLoading={isRefreshing}
              loadingText={'Login'}
              aria-label="login"
            >
              Register
            </Button>
            <Box display="flex" justifyContent="center" mb={2}>
              <Text
                fontFamily="body"
                fontSize="xs"
                fontWeight="normal"
                lineHeight="1.33"
                letterSpacing="0.04em"
                textAlign="center"
              >
                Already have an account?
              </Text>
              <Box
                as="span"
                textDecoration="underline"
                fontFamily="body"
                fontSize="xs"
                fontWeight="normal"
                lineHeight="1.33"
                letterSpacing="0.04em"
                color="#3091EB;"
                textAlign="center"
              >
                <Link to="/">Login</Link>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
