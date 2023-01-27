import React, {useState, useContext, useReducer} from "react"
import reducer from "./reducer"
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  SELECTED_MOVIE,
} from "./actions"
import axios from "axios"

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
const userLocation = localStorage.getItem("location")

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
  movieTitle: "",
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // axios.defaults.headers["Authorization"] = `Bearer ${state.token}`; global declaration of the token header

  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  })

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT})
    }, 4000)
  }

  const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
    localStorage.setItem("location", location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("location")
  }

  const logoutUser = () => {
    dispatch({type: LOGOUT_USER})
    removeUserFromLocalStorage()
  }

  /**
   *
   * @param {User} currentUser the user being passed from the call in Register.js
   *
   * @dispatch used as async and await because axios returns a promise so have to check
   * whether or not it was returned. if we get the  response.data then we dispatch the
   * register user success with the user, token, and their location.
   *
   * @post is connecting to our server post routes which for reigster is the given url and
   * also the current user that was initialized on the register page
   */

  // const registerUser = async (currentUser) => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   try {
  //     const response = await axios.post("/api/v1/auth/register", currentUser);
  //     const { user, token, location } = response.data; //get the data from the response and the labeled json parts and send it in the payload for the server
  //     dispatch({
  //       type: REGISTER_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });
  //     addUserToLocalStorage({ user, token, location });
  //   } catch (error) {
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  const setupUser = async (currentUser, endPoint, alertText) => {
    dispatch({type: SETUP_USER_BEGIN})
    try {
      const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const {user, token, location} = data //get the data from the response and the labeled json parts and send it in the payload for the server
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {user, token, location, alertText},
      })
      addUserToLocalStorage({user, token, location})
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: SETUP_USER_ERROR,
          payload: {msg: error.response.data.msg},
        })
      }
    }
    clearAlert()
  }

  const updateUser = async (currentUser) => {
    dispatch({type: UPDATE_USER_BEGIN})
    try {
      const {data} = await authFetch.patch("/auth/updateUser", currentUser)

      const {user, location, token} = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {user, location, token},
      })

      addUserToLocalStorage({user, location, token})
      console.log(data)
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: {msg: error.response.data.msg},
      })
      console.log(error)
    }
    clearAlert()
  }

  const selectedMovie = (movie) => {
    dispatch({
      type: SELECTED_MOVIE,
      payload: {
        title: movie.title,
        image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      },
    })
  }

  const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        selectedMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

//make sure use
const useAppContext = () => {
  return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}
