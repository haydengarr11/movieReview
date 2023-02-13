import {Link} from "react-router-dom"
import {useAppContext} from "../context/appContext"
import styled from "styled-components"
import moment from "moment"

const Show = ({
  _id,
  showTitle,
  showImage,
  creatorName,
  showReview,
  createdAt,
  showRating,
}) => {
  let date = moment(createdAt)
  date = date.format("MMM Do YY")
  return (
    <Wrapper>
      <header>
        <img src={showImage} alt={`${showTitle} cover`} className="main-icon" />
        <h3>{showTitle}</h3>
      </header>
      <div className=".info">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            name="showRating"
            key={value}
            value={showRating}
            className={`star ${value <= showRating ? "filled" : ""}`}
          >
            &#9733;
          </span>
        ))}
        <h6>Review By: {creatorName}</h6>
        <p>{showReview}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 2fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    background-color: var(--grey-100);
    h5 {
      letter-spacing: 0;
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
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    display: grid;

    h6 {
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
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
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
`

export default Show
