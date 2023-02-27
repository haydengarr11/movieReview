import {useAppContext} from "../../context/appContext"
import {useState} from "react"
import styled from "styled-components"
import {Alert} from "../index"
const ShowReview = () => {
  const {
    showTitle,
    showImage,
    user,
    removeSelectedShow,
    showReview,
    showRating,
    createShow,
    handleMovieChange,
    showAlert,
    displayAlert,
    isEditing,
    editShow,
  } = useAppContext()
  const title = showTitle
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const image = showImage
  const [firstName, setFirstName] = useState(user?.name)

  const handleStarClick = (val) => {
    setRating(val)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!showRating || !showReview) {
      displayAlert()
      return
    }
    if (isEditing) {
      editShow()
      return
    }
    createShow()
  }
  const handleChange = (name, value) => {
    handleMovieChange({name: name, value: value})
  }

  return (
    <Wrapper>
      <div className="container-fluid show-review">
        <form className="form show-form" onSubmit={handleSubmit}>
          {showAlert && <Alert />}
          <h2>{showTitle}</h2>
          <img
            src={showImage}
            alt="cover of show"
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
                name="showRating"
                key={value}
                className={`star ${value <= showRating ? "filled" : ""}`}
                onClick={() => {
                  handleStarClick(value)
                  handleChange("showRating", value)
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
            name="showReview"
            value={showReview}
            className="textarea mx-auto"
            rows="5"
            cols="45"
            onChange={(e) => handleChange("showReview", e.target.value)}
          />
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-inline-block" type="submit">
              {isEditing ? "Edit" : "Submit"} Review
            </button>
            <button
              className="btn btn-inline-block btn-danger reset"
              type="reset"
              onClick={removeSelectedShow}
            >
              Reset
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

  @media (max-width: 500px) {
    .movie-form {
      width: 90vw;
    }
    textarea {
      width: 75vw;
    }
  }
`

export default ShowReview
