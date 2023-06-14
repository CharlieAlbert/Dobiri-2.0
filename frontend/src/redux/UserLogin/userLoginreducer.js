import {
    LOGOUT_USER_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
  } from "./userLogin.type";
  
  const token = localStorage.getItem("usertoken");
  
  let initialUserState = {};
  const userFromLocalStorage = localStorage.getItem("user");
  if (token === null) {
    // If usertoken is not found in localStorage, set it to null
    localStorage.setItem("usertoken", null);
  }
  if (userFromLocalStorage) {
    try {
      initialUserState = JSON.parse(userFromLocalStorage);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // If user details are not found or parsing fails, set initialUserState to null
      initialUserState = null;
      localStorage.setItem("user", null);
    }
  } else {
    // If user details are not found in localStorage, set initialUserState to null
    initialUserState = null;
  }
  
  const initialstate = {
    token: token || null,
    isAuth: false,
    isAuthLoading: false,
    isAuthError: false,
    user: initialUserState
  };
  
  const LoginReducer = (state = initialstate, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOGIN_REQUEST: {
        return { ...state, isAuthLoading: true };
      }
  
      case USER_LOGIN_SUCCESS: {
        localStorage.setItem("usertoken", payload.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("cart", JSON.stringify(payload.user.cartitem));
        localStorage.setItem("wishlist", JSON.stringify(payload.user.wishlist));
        return {
          ...state,
          isAuthLoading: false,
          isAuthError: false,
          isAuth: true,
          token: payload.token,
          user: payload.user
        };
      }
  
      case USER_LOGIN_ERROR: {
        return { ...state, isAuthLoading: false, isAuthError: true, isAuth: false };
      }
  
      case LOGOUT_USER_SUCCESS: {
        localStorage.clear();
        return {
          ...state,
          isAuth: false,
          token: null,
          isAuthLoading: false,
          isAuthError: false,
          user: null
        };
      }
  
      default: {
        return state;
      }
    }
  };
  
  export { LoginReducer };
  