import {FormRow, MovieCard, MovieReview} from "../../components"
import {useEffect, useState} from "react"
import axios from "axios"
import styled from "styled-components"
import {useAppContext} from "../../context/appContext"

const AddMovie = () => {
  const [movie, changeMovie] = useState("")
  //const [didSearch, setSearch] = useState(false)
  const [moviesArray, setMovieArray] = useState([])
  const {isLoading, movieTitle, movieImage} = useAppContext()

  useEffect(() => {
    setMovieArray([])
  }, [movie, movieTitle])

  const handleSubmit = (e) => {
    e.preventDefault()
    searchMovie(movie)
  }

  const searchMovie = async (title) => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&`,
      params: {
        query: title,
      },
    })
      .then((res) => {
        const resultsArr = res.data.results
        console.log(resultsArr)
        setMovieArray(resultsArr)
      })
      .catch((err) => console.log(err))
  }

  if (movieTitle === "") {
    return (
      <Wrapper>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <FormRow
              type="text"
              name="search"
              value={movie}
              handleChange={(e) => changeMovie(e.target.value)}
            />
            <button type="submit" className="btn btn-block">
              Search
            </button>
          </form>
          <div className="container-fluid">
            <div className="row">
              {moviesArray.map((movie, key) => {
                return <MovieCard movie={movie} id={key} />
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }

  if (movieTitle !== "") {
    return (
      <Wrapper>
        {" "}
        <MovieReview movie={movie} />{" "}
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <FormRow
            type="text"
            name="search"
            value={movie}
            handleChange={(e) => changeMovie(e.target.value)}
          />
          <button type="submit" className="btn btn-block">
            Search
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .row {
    justify-content: center;
    margin: 30px 20px;
  }
  .btn-block {
    margin-top: 10px;
  }
  .card-img-top {
    border-radius: 4px 4px 10px 10px;
  }

  .primary-back .bck-color {
    background-color: var(--primary-300);
  }
  .sec-back .bck-color {
    background-color: var(--gray-100);
  }

  .cardContainer {
    margin-bottom: 20px;
  }
`

export default AddMovie
