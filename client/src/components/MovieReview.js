import {useAppContext} from "../context/appContext"
import {useState} from "react"
import styled from "styled-components"
const MovieReview = () => {
  const {movieTitle, movieImage, movieBackdrop, user} = useAppContext()
  const [rating, setRating] = useState(0)
  const [firstName, setFirstName] = useState(user?.name)

  const handleStarClick = (val) => {
    setRating(val)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Wrapper>
      <div className="container-fluid">
        {/* <img
          src={movieBackdrop ? movieBackdrop : null}
          alt={movieTitle}
          className="rounded bottom-img"
        /> */}
        <form className="form movie-form" onSubmit={handleSubmit}>
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
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label for="rating" className="form-label">
              Rating
            </label>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${value <= rating ? "filled" : ""}`}
                onClick={() => handleStarClick(value)}
              >
                &#9733;
              </span>
            ))}
            {/* <input
              type="range"
              id="rating"
              name="rating"
              min="0"
              max="10"
              step=".25"
              value={rating}
              onChange={(e) => setRatingVal(e.target.value)}
            />
            <span>{rating}</span> */}
          </div>
          <label for="textarea" className="form-label">
            {" "}
            Review{" "}
          </label>
          <textarea className="textarea mx-auto" rows="5" cols="45" />
          <button className="btn btn-inline-block mt-2" type="submit">
            Submit Review
          </button>
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
