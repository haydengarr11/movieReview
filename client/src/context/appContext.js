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
  GET_OWN_SHOWS_SUCCESS,
  SET_EDIT_MOVIE,
  SET_EDIT_SHOW,
  EDIT_MOVIEORSHOW_BEGIN,
  EDIT_MOVIE_SUCCESS,
  EDIT_MOVIE_ERROR,
  EDIT_SHOW_SUCCESS,
  EDIT_SHOW_ERROR,
  DELETE_MOVIEORSHOW_BEGIN,
  SHOW_MOVIE_STATS_BEGIN,
  SHOW_MOVIE_STATS_SUCCESS,
  SHOW_SHOW_STATS_BEGIN,
  SHOW_SHOW_STATS_SUCCESS,
  TOGGLE_STATS,
  CLEAR_MOVIE_FILTERS,
  CLEAR_SHOW_FILTERS,
  CLEAR_OWN_MOVIE_FILTERS,
  CLEAR_OWN_SHOW_FILTERS,
  // CHANGE_DISPLAY_SHOWS,
  // CHANGE_DISPLAY_MOVIES,
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
  showSidebar: false,
  isEditing: false,
  editMovieId: "",
  editShowId: "",
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
  totalOwnShows: 0,
  shows: [],
  totalShows: 0,
  profilePage: 1,
  moviePage: 1,
  numOfMoviePages: 1,
  ownMoviePage: 1,
  numOfOwnMoviePages: 1,
  showPage: 1,
  numOfShowPages: 1,
  ownShowPage: 1,
  numOfOwnShowPages: 1,
  movieStats: {},
  showStats: {},
  monthlyMovies: [],
  monthlyShows: [],
  statsMovies: "movies",
  movieRatingType: "all",
  ownMovieRatingType: "all",
  movieRatingOptions: ["all", 1, 2, 3, 4, 5],
  movieSearch: "",
  ownMovieSearch: "",
  movieSort: "latest",
  ownMovieSort: "latest",
  movieSortOptions: ["latest", "oldest", "A-Z", "Z-A", "Rating", "Rating Asc"],
  showRatingType: "all",
  showRatingOptions: ["all", 1, 2, 3, 4, 5],
  showSearch: "",
  showSort: "latest",
  showSortOptions: ["latest", "oldest", "A-Z", "Z-A", "Rating", "Rating Asc"],
  ownShowRatingType: "all",
  ownShowSearch: "",
  ownShowSort: "latest",
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
  const changeChart = (category) => {
    dispatch({
      type: TOGGLE_STATS,
      payload: {
        statsMovies: category,
      },
    })
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
    const {ownMovieSearch, ownMovieSort, ownMovieRatingType, user} = state
    const id = user._id
    let url = `/movies/${id}?movieRating=${ownMovieRatingType}&sort=${ownMovieSort}`
    if (ownMovieSearch) {
      url = url + `&search=${ownMovieSearch}`
    }

    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {ownMovies, totalOwnMovies, numOfOwnMoviePages} = data
      dispatch({
        type: GET_OWN_MOVIES_SUCCESS,
        payload: {
          ownMovies,
          totalOwnMovies,
          numOfOwnMoviePages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }
  const getOwnShows = async () => {
    const {ownShowSearch, ownShowSort, ownShowRatingType, user} = state
    const id = user._id
    let url = `/shows/${id}?showRating=${ownShowRatingType}&sort=${ownShowSort}`
    if (ownShowSearch) {
      url = url + `&search=${ownShowSearch}`
    }

    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {ownShows, totalOwnShows, numOfOwnShowPages} = data
      dispatch({
        type: GET_OWN_SHOWS_SUCCESS,
        payload: {
          ownShows,
          totalOwnShows,
          numOfOwnShowPages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }

  const getAllMovies = async () => {
    const {movieSearch, movieSort, movieRatingType} = state
    let url = `/movies?movieRating=${movieRatingType}&sort=${movieSort}`
    if (movieSearch) {
      url = url + `&search=${movieSearch}`
    }
    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {movies, totalMovies, numOfMoviePages} = data
      dispatch({
        type: GET_ALLMOVIES_SUCCESS,
        payload: {
          movies,
          totalMovies,
          numOfMoviePages,
        },
      })
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
    clearAlert()
  }
  const getAllShows = async () => {
    const {showSearch, showSort, showRatingType} = state
    let url = `/shows?showRating=${showRatingType}&sort=${showSort}`
    if (showSearch) {
      url = url + `&search=${showSearch}`
    }

    dispatch({type: GET_MOVIESORSHOWS_BEGIN})
    try {
      const {data} = await authFetch(url)
      const {shows, totalShows, numOfShowPages} = data
      dispatch({
        type: GET_ALLSHOWS_SUCCESS,
        payload: {
          shows,
          totalShows,
          numOfShowPages,
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
  const setEditShow = (id) => {
    dispatch({type: SET_EDIT_SHOW, payload: {id}})
  }
  const editMovie = async () => {
    dispatch({type: EDIT_MOVIEORSHOW_BEGIN})

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
  const editShow = async () => {
    dispatch({type: EDIT_MOVIEORSHOW_BEGIN})

    try {
      const {showReview, showRating, showTitle, showImage} = state

      await authFetch.patch(`/shows/${state.editShowId}`, {
        showRating,
        showReview,
        showTitle,
        showImage,
      })
      dispatch({type: EDIT_SHOW_SUCCESS})
      dispatch({type: REMOVE_SHOW})
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_SHOW_ERROR,
        payload: {msg: error.response.data.msg},
      })
    }
    clearAlert()
  }

  const deleteMovie = async (movieId) => {
    dispatch({type: DELETE_MOVIEORSHOW_BEGIN})
    try {
      await authFetch.delete(`/movies/${movieId}`)
      getAllMovies()
      getOwnMovies()
    } catch (error) {
      logoutUser()
    }
  }
  const deleteShow = async (showId) => {
    dispatch({type: DELETE_MOVIEORSHOW_BEGIN})
    try {
      await authFetch.delete(`/shows/${showId}`)
      getAllShows()
      getOwnShows()
    } catch (error) {
      logoutUser()
    }
  }

  const showMovieStats = async () => {
    dispatch({type: SHOW_MOVIE_STATS_BEGIN})
    try {
      const {data} = await authFetch("/movies/stats")
      dispatch({
        type: SHOW_MOVIE_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyMovies: data.monthlyMovies,
        },
      })
    } catch (error) {
      console.log(error.response)
    }
    clearAlert()
  }
  const showShowStats = async () => {
    dispatch({type: SHOW_SHOW_STATS_BEGIN})
    try {
      const {data} = await authFetch("/shows/stats")
      dispatch({
        type: SHOW_SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyShows: data.monthlyShows,
        },
      })
    } catch (error) {
      console.log(error.response)
    }
    clearAlert()
  }
  const clearMovieFilters = () => {
    dispatch({type: CLEAR_MOVIE_FILTERS})
  }
  const clearShowFilters = () => {
    dispatch({type: CLEAR_SHOW_FILTERS})
  }
  const clearOwnMovieFilters = () => {
    dispatch({type: CLEAR_OWN_MOVIE_FILTERS})
  }
  const clearOwnShowFilters = () => {
    dispatch({type: CLEAR_OWN_SHOW_FILTERS})
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
        getOwnShows,
        getAllMovies,
        getAllShows,
        setEditMovie,
        editShow,
        setEditShow,
        editMovie,
        deleteMovie,
        showMovieStats,
        deleteShow,
        showShowStats,
        changeChart,
        clearMovieFilters,
        clearShowFilters,
        clearOwnMovieFilters,
        clearOwnShowFilters,
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
