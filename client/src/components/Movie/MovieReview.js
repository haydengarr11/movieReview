import {useAppContext} from "../../context/appContext"
import {useState} from "react"
import styled from "styled-components"
import {Alert} from "../index"
import {Link} from "react-router-dom"
const MovieReview = () => {
  const {
    movieTitle,
    movieImage,
    user,
    removeSelected,
    movieReview,
    movieRating,
    createMovie,
    handleMovieChange,
    showAlert,
    displayAlert,
    isEditing,
    editMovie,
  } = useAppContext()

  const [rating, setRating] = useState(0)
  const [firstName, setFirstName] = useState(user?.name)

  const handleStarClick = (val) => {
    setRating(val)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!movieRating || !movieReview) {
      displayAlert()
      return
    }
    if (isEditing) {
      editMovie()
      return
    }
    createMovie()
  }
  const handleChange = (name, value) => {
    handleMovieChange({name: name, value: value})
  }

  return (
    <Wrapper>
      <div className="container-fluid movie-review">
        <form className="form movie-form" onSubmit={handleSubmit}>
          {showAlert && <Alert />}
          <h2>{movieTitle}</h2>
          <img
            src={movieImage}
            alt="cover of movie"
            className="top-img mx-auto d-block"
          />
          <div className="input-range">
            <label for="name" className="form-label">
              name
            </label>
            <input
              type="text"
              id="name"
              disabled={firstName ? true : false}
              value={
                user.lastName ? `${firstName} ${user.lastName}` : firstName
              }
              className="form-input"
            />
            <label for="rating" className="form-label">
              Rating
            </label>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                name="movieRating"
                key={value}
                className={`star ${value <= movieRating ? "filled" : ""}`}
                onClick={() => {
                  handleStarClick(value)
                  handleChange("movieRating", value)
                }}
              >
                &#9733;
              </span>
            ))}
          </div>
          <label for="textarea" className="form-label">
            {" "}
            Review{" "}
          </label>
          <textarea
            name="movieReview"
            value={movieReview}
            className="textarea mx-auto"
            rows="5"
            cols="45"
            onChange={(e) => handleChange("movieReview", e.target.value)}
          />
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-inline-block" type="submit">
              {isEditing ? "Change" : "Submit"} Review
            </button>

            <button
              className="btn btn-inline-block btn-danger reset"
              type="reset"
              onClick={removeSelected}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  justify-content: center;
  h2 {
    text-align: center;
    /* background-color: var(--primary-300); */
    border-radius: 10px;
    width: 100%;
  }

  .form-label {
    margin: 0 !important;
  }

  img {
    height: 30rem;
  }
  .bottom-img {
    width: 100vw;
    height: 100vh;
  }
  .top-img {
    height: 20rem;
  }

  //star rating system

  .star {
    cursor: pointer;
    font-size: 2em;
    color: #ccc;
    margin-right: 0.5em;
  }

  .filled {
    color: #ffc107;
  }
`

export default MovieReview
