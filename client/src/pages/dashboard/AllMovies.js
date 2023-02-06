import {useEffect} from "react"
import {useAppContext} from "../../context/appContext"

const AllMovies = () => {
  const {getAllMovies, movies} = useAppContext()
  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <>
      {movies.map((movie, id) => {
        return (
          <div>
            <p>{movie.movieTitle}</p>
            <p>{movie.createdBy}</p>
          </div>
        )
      })}
    </>
  )
}
export default AllMovies
