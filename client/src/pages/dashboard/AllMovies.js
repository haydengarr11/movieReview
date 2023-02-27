import styled from "styled-components"
import {MoviesContainer} from "../../components"
import MovieSearchContainer from "../../components/MovieSearchContainer"

const AllMovies = () => {
  return (
    <Wrapper>
      <div className="container-fluid">
        <MovieSearchContainer />
        <MoviesContainer />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container-fluid {
    background-image: url(https://c4.wallpaperflare.com/wallpaper/971/1011/721/blue-pastel-wallpaper-preview.jpg);
    background-size: cover;
    background-repeat: repeat;
    width: 100%;
  }
`
export default AllMovies
