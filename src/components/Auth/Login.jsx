import { Box, Button, Heading, Text } from '@chakra-ui/react';
import CustomInput from 'components/sheared/CustomInput';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from 'redux/auth/auth-operations';
import { isRefreshingSelector } from 'redux/auth/auth-selector';
// import socket from 'utils/socketConnection';
import { loginYupSchema } from 'utils/validationSchemas/validationSchemas';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isRefreshing = useSelector(isRefreshingSelector);

  const handleShowPasswordClick = () => {
    setShowPassword(prevState => !prevState);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async values => {
    const authData = { email: values.email, password: values.password };
    dispatch(login(authData));
  };

  // const handleJoin = () => {
  //   console.log(`Connection to room ${state.roomId}`);
  //   socket.emit('joinRoom', state.roomId);
  //   dispatch({ type: 'toggleShowChat', payload: true });
  // };

  return (
    <Box>
      <Heading
        color={'#ffffff'}
        textShadow={
          '    0 0 1px #fff,    0 0 2px #fff,    0 0 5px #fff,    0 0 11px #ae00ff,    0 0 20px #ae00ff,    0 0 30px #ae00ff,    0 0 55px #ae00ff,    0 0 80px #ae00ff'
        }
      >
        SIGN IN
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={loginYupSchema}
        onSubmit={onSubmit}
        isSubmitting
      >
        {formik => (
          <Box
            as={Form}
            // position="relative"
            width={{ base: '280px', md: '448px', xl: '458px' }}
            mx={'auto'}
            my={'10'}
          >
            <CustomInput
              type="email"
              name="email"
              id="lg-email"
              placeholder="Email"
            />
            <CustomInput
              type="password"
              name="password"
              id="lg-password"
              placeholder="Password"
              show={showPassword}
              handleClick={handleShowPasswordClick}
              mb="40px"
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
              Login
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
                Don't have an account?
              </Text>
              <Box
                as="span"
                textDecoration="underline"
                fontFamily="body"
                fontSize="xs"
                fontWeight="normal"
                lineHeight="1.33"
                letterSpacing="0.04em"
                color="#3091EB"
                textAlign="center"
              >
                <Link to="/register">Register</Link>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
