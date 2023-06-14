import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Image, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Userlogin } from '../../../redux/UserLogin/userLoginaction';
import { logoutUser } from '../../../redux/UserLogin/userLoginaction';

import Logo from '../../../Assets/Dobiri.png';

const Login = () => {
  const [login, setLogin] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuth, isAuthError, isAuthLoading } = useSelector((store) => store.loginAuth);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Userlogin(login));
  };

  useEffect(() => {
    if (isAuth) {
      if (state === null) {
        toast({
          title: 'Success',
          description: 'Welcome To The Login Dashboard',
          status: 'success',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
        
        const confirmLogout = window.confirm("You are already logged in. Do you want to logout?");
        if (confirmLogout) {
          handleLogout();
        } else {
          navigate('/');
        }
      } else if (state !== null) {
        const confirmLogout = window.confirm("You are already logged in. Do you want to logout?");
        if (confirmLogout) {
          handleLogout();
        } else {
          navigate(state.from, { replace: true });
          navigate('/');
          toast({
            title: 'Success',
            description: 'Logged out successfully',
            status: 'success',
            duration: 2000,
            position: 'top',
            isClosable: true,
          });
        }
      }
    }
    if (isAuthError) {
      toast({
        title: 'Something Went Wrong',
        description: 'Enter correct Email and Password',
        status: 'error',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }, [isAuth, isAuthError]);

  const handleLogout = () => {
    dispatch(logoutUser());
    // Add any necessary logic for clearing user data or performing other tasks on logout
  };


  return (
    <>
      <div>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Stack
            spacing={6}
            w={'full'}
            maxW={'md'}
            rounded={'xl'}
            boxShadow={'lg'}
            p={5}
            my={12}
            alignItems={'center'}
          >
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Login
            </Heading>
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <FormControl id="email" isRequired pb={'20px'}>
                <FormLabel fontSize={'18px'}>Email address</FormLabel>
                <Input
                  placeholder="your-email@domain.com"
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired pb={'20px'}>
                <FormLabel fontSize={'18px'}>Password</FormLabel>
                <Input type="password" name="password" onChange={handleChange} />
              </FormControl>
              <Stack spacing={6} alignItems={'center'}>
                <Button
                  isLoading={isAuthLoading}
                  width={'200px'}
                  bg={'#000'}
                  color={'white'}
                  _hover={{
                    bg: '#eb5e28',
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </form>
            <Stack>
              <Link to="/signup">
                <Button
                  width={'200px'}
                  bg={'#000'}
                  color={'white'}
                  _hover={{
                    bg: '#eb5e28',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
              {isAuth && (
                <Button
                  onClick={handleLogout}
                  width={'200px'}
                  bg={'#000'}
                  color={'white'}
                  _hover={{
                    bg: '#eb5e28',
                  }}
                >
                  Logout
                </Button>
              )}
            </Stack>
          </Stack>
        </Flex>
      </div>
    </>
  );
};

export default Login;