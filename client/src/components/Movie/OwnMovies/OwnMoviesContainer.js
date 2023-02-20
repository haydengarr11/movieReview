import {useEffect} from "react"
import {useAppContext} from "../../../context/appContext"
import styled from "styled-components"
import Movie from "../Movie"
import Alert from "../../Alert"

const MoviesContainer = () => {
  const {getOwnMovies, isLoading, totalOwnMovies, page, ownMovies, showAlert} =
    useAppContext()
  useEffect(() => {
    getOwnMovies()
  }, [])
  ownMovies.forEach((element) => {
    element.createdAt = new Date(element.createdAt)
  })

  ownMovies.sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  if (isLoading) {
    // return <Loading />
  }
  if (ownMovies.length === 0) {
    return (
      <Wrapper>
        <h2> No movies to show...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalOwnMovies} movie{ownMovies.length > 1 && "s"} found
      </h5>
      <div className="movies">
        {ownMovies.map((movie) => {
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
