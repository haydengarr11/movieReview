import React, {useState, useContext, useReducer, useEffect} from "react"
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
  REMOVE_MOVIE,
  HANDLE_MOVIE_CHANGE,
  CREATE_MOVIE_BEGIN,
  CREATE_MOVIE_ERROR,
  CREATE_MOVIE_SUCCESS,
  SELECTED_SHOW,
  REMOVE_SHOW,
  CREATE_SHOW_BEGIN,
  CREATE_SHOW_SUCCESS,
  CREATE_SHOW_ERROR,
  GET_MOVIESORSHOWS_BEGIN,
  GET_ALLMOVIES_SUCCESS,
  GET_ALLSHOWS_SUCCESS,
  GET_OWN_MOVIES_SUCCESS,
  SET_EDIT_MOVIE,
  EDIT_MOVIE_BEGIN,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_ERROR,
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
  isEditing: false,
  editMovieId: "",
  movieTitle: "",
  movieReview: "",
  movieImage: "",
  movieRating: 0,
  showTitle: "",
  showReview: "",
  showImage: "",
  showRating: 0,
  ownMovies: [],
  totalOwnMovies: 0,
  movies: [],
  totalMovies: 0,
  ownShows: [],
  shows: [],
  totalShows: 0,
  page: 1,
  numOfPages: 1,
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
        backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      },
    })
  }

  const selectedShow = (show) => {
    dispatch({
      type: SELECTED_SHOW,
      payload: {
        title: show.name,
        image: `https://image.tmdb.org/t/p/original${show.poster_path}`,
      },
    })
  }

  const removeSelected = () => {
    dispatch({type: REMOVE_MOVIE})
  }
  const removeSelectedShow = () => {
    dispatch({type: REMOVE_SHOW})
  }

  const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
  }

  const handleMovieChange = ({name, value}) => {
    dispatch({type: HANDLE_MOVIE_CHANGE, payload: {name, value}})
  }

  const createMovie = async () => {
    dispatch({type: CREATE_MOVIE_BEGIN})
    try {
      const {movieTitle, movieReview, movieRating, movieImage, token} = state

      await authFetch.post("movies", {
        movieTitle,
        movieRating,
        movieReview,
        movieImage,
      })
      dispatch({type: CREATE_MOVIE_SUCCESS})
      dispatch({type: REMOVE_MOVIE})
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_MOVIE_ERROR,
        payload: {msg: "context error"},
      })
    }
    clearAlert()
  }

  const createShow = async () => {
    dispatch({type: CREATE_SHOW_BEGIN})
    try {
      const {showTitle, showReview, showRating, showImage, token} = state
      await authFetch.post("shows", {
        showTitle,
        showRating,
        showReview,
        showImage,
      })
      dispatch({type: CREATE_SHOW_SUCCESS})
      dispatch({type: REMOVE_SHOW})
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_SHOW_ERROR,
        payload: {msg: "context error"},
      })
    }
    clearAlert()
  }

  const getOwnMovies = async () => {
    const id = user._id
    let url = `/movies/${id}`

    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {ownMovies, totalOwnMovies, numOfPages} = data
      dispatch({
        type: GET_OWN_MOVIES_SUCCESS,
        payload: {
          ownMovies,
          totalOwnMovies,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }

  const getAllMovies = async () => {
    let url = `/movies`

    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {movies, totalMovies, numOfPages} = data
      dispatch({
        type: GET_ALLMOVIES_SUCCESS,
        payload: {
          movies,
          totalMovies,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }
  const getAllShows = async () => {
    let url = `/shows`

    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {shows, totalShows, numOfPages} = data
      dispatch({
        type: GET_ALLSHOWS_SUCCESS,
        payload: {
          shows,
          totalShows,
          numOfPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }

  const setEditMovie = (id) => {
    dispatch({type: SET_EDIT_MOVIE, payload: {id}})
  }

  const editMovie = async () => {
    dispatch({type: EDIT_MOVIE_BEGIN})

    try {
      const {movieReview, movieRating, movieTitle, movieImage} = state

      await authFetch.patch(`/movies/${state.editMovieId}`, {
        movieRating,
        movieReview,
        movieTitle,
        movieImage,
      })
      dispatch({type: EDIT_MOVIE_SUCCESS})
      dispatch({type: REMOVE_MOVIE})
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_MOVIE_ERROR,
        payload: {msg: error.response.data.msg},
      })
    }
    clearAlert()
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
        removeSelected,
        createMovie,
        handleMovieChange,
        selectedShow,
        removeSelectedShow,
        createShow,
        getOwnMovies,
        getAllMovies,
        getAllShows,
        setEditMovie,
        editMovie,
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
