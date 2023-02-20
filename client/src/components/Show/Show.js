import {Link} from "react-router-dom"
import styled from "styled-components"
import moment from "moment"
import {useAppContext} from "../../context/appContext"
import {FaCalendar} from "react-icons/fa"

const Show = ({
  _id,
  showTitle,
  showImage,
  creatorName,
  showReview,
  createdAt,
  showRating,
  createdBy,
}) => {
  const {user, setEditShow, deleteShow} = useAppContext()
  let date = moment(createdAt)
  date = date.format("MMM Do")
  return (
    <Wrapper>
      <header>
        <img src={showImage} alt={`${showTitle} cover`} className="main-icon" />
        <h3 className="title">{showTitle}</h3>
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
              value={showRating}
              className={`star ${value <= showRating ? "filled" : ""}`}
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
          <p>{showReview}</p>
        </div>
        <footer>
          {createdBy === user._id && (
            <div className="footer-start">
              <Link
                to="/add-show"
                className="btn edit-btn"
                onClick={() => setEditShow(_id)}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteShow(_id)}
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
  max-width: 595px;
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
  /* .info {
    display: grid;
    grid: repeat(3, 1fr);
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    margin: 0px 15px;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  } */
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
`

export default Show
