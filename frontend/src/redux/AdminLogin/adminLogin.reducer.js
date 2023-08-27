import {
  ADMIN_LOGIN,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGOUT,
  ISLoding,
} from "./adminLogin.type";

const token = localStorage.getItem("AdminToken");
const data = JSON.parse(localStorage.getItem("AdminData")) || {};
const tokenExpiration = localStorage.getItem("AdminTokenExpiration"); // Get the token's expiration time

const currentTime = new Date().getTime();
const isTokenValid = tokenExpiration && currentTime < Number(tokenExpiration);

const initialValue = {
  isAuth: isTokenValid, // Check if the token is still valid
  token: token,
  data: data,
  error: false,
  isErrorMsg: null,
  isLoading: false,
};

export const adminReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case ADMIN_LOGIN: {
      const expiresIn = 43200; // Set this value based on your API response
      const expirationTime = new Date().getTime() + expiresIn * 1000; // Convert expiresIn to milliseconds
      localStorage.setItem("AdminToken", payload.token);
      localStorage.setItem("AdminData", JSON.stringify(payload.admin));
      localStorage.setItem("AdminTokenExpiration", expirationTime); // Store the expiration time
      
      return {
        ...state,
        isAuth: true,
        token: payload.token,
        data: payload.admin,
        error: false,
        isLoading: false,
      };
    }
    case ADMIN_LOGIN_ERROR: {
      return {
        ...state,
        isAuth: false,
        token: payload,
        isErrorMsg: payload.msg,
        data: payload,
        error: true,
        isLoading: false,
      };
    }
    case ISLoding: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ADMIN_LOGOUT: {
      localStorage.removeItem("AdminToken");
      localStorage.removeItem("AdminData");
      localStorage.removeItem("AdminTokenExpiration"); // Remove the expiration time
      return {
        ...state,
        isAuth: false,
        token: "",
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
