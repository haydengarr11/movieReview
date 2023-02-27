import {Link} from "react-router-dom"
import {useAppContext} from "../../context/appContext"
import styled from "styled-components"
import moment from "moment"
import {FaCalendar} from "react-icons/fa"

const Movie = ({
  _id,
  movieTitle,
  movieImage,
  creatorName,
  movieReview,
  createdAt,
  movieRating,
}) => {
  const {user, setEditMovie, deleteMovie} = useAppContext()
  let date = moment(createdAt)
  date = date.format("MMM Do")
  if (movieTitle.length > 30) {
    movieTitle = movieTitle.substring(0, 27) + "..."
  }
  return (
    <Wrapper>
      <header>
        <img
          src={movieImage}
          alt={`${movieTitle} cover`}
          className="main-icon"
        />
        <h3 className="title" truncate>
          {movieTitle}
        </h3>
      </header>
      <div className="info">
        <div className=".content-center">
          <label className="rl" for="movieRating">
            Rating
          </label>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              name="movieRating"
              key={value}
              value={movieRating}
              className={`star ${value <= movieRating ? "filled" : ""}`}
            >
              &#9733;
            </span>
          ))}
          <h6>
            <b>Reviewed By:</b> {creatorName}
          </h6>
        </div>
        <div className="review-p truncate">
          <b>Review:</b>
          <p>{movieReview}</p>
        </div>
        <footer>
          {creatorName === `${user.name} ${user.lastName}` && (
            <div className="footer-start">
              <Link
                to="/add-movie"
                className="btn edit-btn"
                onClick={() => setEditMovie(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteMovie(_id)}
              >
                Delete
              </button>
            </div>
          )}
          <p>
            <FaCalendar /> {date}
          </p>
        </footer>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  max-width: 570px;
  max-height: 500px;
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    border-radius: 0.25rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: var(--grey-100);
    h3 {
      letter-spacing: 0;
      margin-right: 3rem;
    }
  }
  .main-icon {
    width: 100px;
    height: 150px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    display: grid;
    grid-template-rows: 1fr 120px;
    margin-left: 1rem;
    label {
      margin-right: 1rem;
      font-weight: bold;
    }
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  footer {
    display: flex;
    justify-content: space-between;
    p {
      display: flex;
      justify-content: flex-end;
      margin-right: 1rem;
      align-items: center;
      margin-top: 1rem;
    }
    .footer-start {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 1rem;
      margin-right: 2rem;
    }
  }
  .truncate {
    width: inherit;
    overflow: auto;
    text-overflow: ellipsis;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }

  .star {
    font-size: 2em;
    color: #ccc;
    margin-right: 0.5em;
  }

  .filled {
    color: #ffc107;
  }
  @media (max-width: 767px) {
    /* adjust the grid-template-rows to make the image and title stack on top of each other */
    grid-template-rows: auto auto;

    /* decrease the width of the main icon */
    .main-icon {
      width: 75px;
      height: 112.5px;
    }

    /* adjust the grid-template-columns to stack the rating and reviewer name on top of each other */
    .info {
      grid-template-columns: 1fr;
    }

    /* reduce the font size of the review and adjust the width to fit the screen */
    .review-p {
      font-size: 0.8rem;
      width: 90%;
    }

    /* adjust the margin of the edit and delete buttons */
    .edit-btn,
    .delete-btn {
      margin: 0.5rem 0;
    }
  }
`

export default Movie
