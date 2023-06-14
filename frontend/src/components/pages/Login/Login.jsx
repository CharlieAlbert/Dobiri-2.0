import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/UserLogin/userLoginaction';
import { Userlogin } from '../../../redux/UserLogin/userLoginaction';
import Logo from '../../../Assets/Dobiri.png';

const Login = () => {
  const [login, setLogin] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuth, isAuthError, isAuthLoading } = useSelector((store) => store.loginAuth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmLogout(true);
    dispatch(Userlogin(login));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast({
      title: 'Success',
      description: 'Logged out successfully',
      status: 'success',
      duration: 2000,
      position: 'top',
      isClosable: true,
    });
    navigate('/');
    // Add any necessary logic for clearing user data or performing other tasks on logout
  };

  useEffect(() => {
    if (isAuth) {
      if (isAuthLoading) {
        return; // Wait for the authentication process to finish
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
      } else {
        if (showConfirmLogout) {
          window.location.href = ('/');
        } else if (state !== null) {
          navigate(state.from, { replace: true });
          navigate('/');
          toast({
            title: 'Success',
            description: 'Welcome To The Login Dashboard',
            status: 'success',
            duration: 2000,
            position: 'top',
            isClosable: true,
          });
        }
      }
    }
  }, [isAuth, isAuthLoading, isAuthError, navigate, state, toast, showConfirmLogout]);

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
            {isAuth && (
              <>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                  Click to Logout
                </Heading>
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
              </>
            )}
            {!isAuth && (
              <>
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
                </Stack>
              </>
            )}
          </Stack>
        </Flex>
      </div>
    </>
  );
};

export default Login;
