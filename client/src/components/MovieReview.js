import {useAppContext} from "../context/appContext"
import {useState} from "react"

const MovieReview = () => {
  const {movieTitle, movieImage} = useAppContext()
  const [rating, setRatingVal] = useState(7)

  return (
    <form>
      <h2>{movieTitle}</h2>
      <img src={movieImage} alt={movieTitle} />
      <div className="input-range">
        <input
          type="range"
          id="rating"
          name="rating"
          min="0"
          max="10"
          step=".25"
          value={rating}
          onChange={(e) => setRatingVal(e.target.value)}
        />
        <span>{rating}</span>
      </div>
    </form>
  )
}

export default MovieReview
