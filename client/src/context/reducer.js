import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
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
import {initialState} from "./appContext"

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    }
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      isLoading: false,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated",
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === SELECTED_MOVIE) {
    return {
      ...state,
      movieTitle: action.payload.title,
      movieImage: action.payload.image,
    }
  }
  if (action.type === SELECTED_SHOW) {
    return {
      ...state,
      showTitle: action.payload.title,
      showImage: action.payload.image,
    }
  }
  if (action.type === HANDLE_MOVIE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === REMOVE_MOVIE) {
    return {
      ...state,
      movieTitle: "",
      movieImage: "",
      movieReview: "",
      movieRating: 0,
    }
  }
  if (action.type === CREATE_MOVIE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === CREATE_MOVIE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Movie Review Created!",
    }
  }
  if (action.type === CREATE_MOVIE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === REMOVE_SHOW) {
    return {
      ...state,
      showTitle: "",
      showImage: "",
      showReview: "",
      showRating: 0,
    }
  }
  if (action.type === CREATE_SHOW_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === CREATE_SHOW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Show Review Created!",
    }
  }
  if (action.type === CREATE_SHOW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_MOVIESORSHOWS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === GET_OWN_MOVIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      ownMovies: action.payload.ownMovies,
      totalOwnMovies: action.payload.totalOwnMovies,
      numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === GET_ALLSHOWS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      shows: action.payload.shows,
      totalShows: action.payload.totalShows,
      numOfPages: action.payload.numOfPages,
    }
  }

  if (action.type === GET_ALLMOVIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      movies: action.payload.movies,
      totalMovies: action.payload.totalMovies,
      numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === SET_EDIT_MOVIE) {
    const movie = state.movies.find((movie) => movie._id === action.payload.id)
    const {_id, movieTitle, movieImage, movieRating, creatorName, movieReview} =
      movie

    return {
      ...state,
      isEditing: true,
      editMovieId: _id,
      movieTitle,
      movieImage,
      movieRating,
      creatorName,
      movieReview,
    }
  }
  if (action.type === EDIT_MOVIE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_MOVIE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Movie Updated!",
    }
  }
  if (action.type === EDIT_MOVIE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    }
  }

  throw new Error(`No such action: ${action.type}`)
}

export default reducer
