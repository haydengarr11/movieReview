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
      movieBackdrop: action.payload.backdrop,
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
      movieBackdrop: "",
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

  throw new Error(`No such action: ${action.type}`)
}

export default reducer
