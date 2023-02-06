import styled from "styled-components"
import {useAppContext} from "../context/appContext"
import CardShowPhoto from "./CardMoviePhoto"

const ShowCard = ({show, id}) => {
  const image = "https://image.tmdb.org/t/p/original"
  const releaseDate = new Date(show.first_air_date)
  const dateOptions = {month: "long", year: "numeric"}
  const {isLoading, selectedShow} = useAppContext()

  const handleClick = () => {
    selectedShow(show)
  }

  return (
    <div
      className={
        id % 2 === 0
          ? "cardContainer col-12 col-md-6 col-lg-3 primary-back"
          : "cardContainer col-12 col-md-6 col-lg-3 sec-back"
      }
      key={id}
    >
      <div className="card h-100">
        <img
          src={`${image}${show.poster_path}`}
          alt={show.name}
          className="card-img-top mx-auto d-flex"
        />
        <div className="card-body">
          <h3 className="card-title">{show.name}</h3>
          <h4 className="card-subtitle mb-2 text-muted">
            First Aired: {releaseDate.toLocaleDateString("en-US", dateOptions)}
          </h4>
          {/* <p className="card-text ">{movie.overview}</p> */}
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isLoading}
          onClick={handleClick}
        >
          Select
        </button>
      </div>
    </div>
  )
}

export default ShowCard
