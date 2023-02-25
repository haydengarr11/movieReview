import {FormRow, MovieCard, MovieReview} from "../../components"
import {useEffect, useState} from "react"
import axios from "axios"
import styled from "styled-components"
import {useAppContext} from "../../context/appContext"

const AddMovie = () => {
  const [movie, changeMovie] = useState("")
  const [selected, setSelected] = useState("")
  //const [didSearch, setSearch] = useState(false)
  const [moviesArray, setMovieArray] = useState([])
  const {isLoading, movieTitle, movieImage, editMovieId, isEditing} =
    useAppContext()

  useEffect(() => {
    setMovieArray([])
  }, [movieTitle])

  const handleSubmit = (e) => {
    e.preventDefault()
    searchMovie(movie)
    changeMovie("")
  }

  const searchMovie = async (title) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_MOVIE_KEY,
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
        <div className="bck-img">
          <form className="form" onSubmit={handleSubmit}>
            <FormRow
              type="text"
              name="Search Movie"
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
        <MovieReview />
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
  .btn-primary {
    margin: 0 10px 10px 10px;
  }

  .card {
    margin-bottom: 10px;
  }
  /* .card-body {
    overflow: auto;
  } */
  .container-fluid {
    background-image: url(https://c4.wallpaperflare.com/wallpaper/971/1011/721/blue-pastel-wallpaper-preview.jpg);
    background-size: cover;
    background-repeat: repeat;
    width: 100%;
  }

  .primary-back .bck-color {
    background-color: var(--primary-300);
  }
  .sec-back .bck-color {
    background-color: var(--gray-100);
  }

  .cardContainer {
    margin-bottom: 2rem;
  }
  .movie-form {
    z-index: 500;
    width: 50vw;
  }
`

export default AddMovie
