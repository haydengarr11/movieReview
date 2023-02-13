import MoviesContainer from "../../components/MoviesContainer"
import styled from "styled-components"

const AllMovies = () => {
  return (
    <Wrapper>
      <MoviesContainer />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background-image: url(https://c4.wallpaperflare.com/wallpaper/971/1011/721/blue-pastel-wallpaper-preview.jpg);
  background-size: cover;
  background-repeat: repeat;
  width: 100%;
  height: 100vh;
`
export default AllMovies
