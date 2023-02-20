import {useEffect} from "react"
import {useAppContext} from "../../context/appContext"
import styled from "styled-components"
import Alert from "../Alert"
import Movie from "./Movie"

const MoviesContainer = () => {
  const {getAllMovies, movies, isLoading, page, totalMovies, showAlert} =
    useAppContext()
  useEffect(() => {
    getAllMovies()
  }, [])

  movies.forEach((element) => {
    element.createdAt = new Date(element.createdAt)
  })

  movies.sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  if (isLoading) {
    // return <Loading />
  }
  if (movies.length === 0) {
    return (
      <Wrapper>
        <h2> No movies to show...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalMovies} movie{movies.length > 1 && "s"} found
      </h5>
      <div className="movies">
        {movies.map((movie) => {
          return <Movie key={movie._id} {...movie} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .movies {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 900px) {
    .movies {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 1330px) {
    .movies {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    @media (min-width: 1700px) {
      .movies {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 0.5rem;
      }
    }
  }
`

export default MoviesContainer
