import styled from "styled-components"
import {useAppContext} from "../../context/appContext"

const MovieCard = ({movie, id}) => {
  const image = "https://image.tmdb.org/t/p/original"
  const releaseDate = new Date(movie.release_date)
  const dateOptions = {month: "long", year: "numeric"}
  const {isLoading, selectedMovie} = useAppContext()

  const handleClick = () => {
    selectedMovie(movie)
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
          src={`${image}${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top mx-auto d-flex"
        />
        <div className="card-body">
          <h3 className="card-title">{movie.title}</h3>
          <h4 className="card-subtitle mb-2 text-muted">
            {releaseDate.toLocaleDateString("en-US", dateOptions)}
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

export default MovieCard
