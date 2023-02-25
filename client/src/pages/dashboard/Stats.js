import {useEffect} from "react"
import {useAppContext} from "../../context/appContext"
import {StatsContainer, Loading, ChartsContainer} from "../../components"
import styled from "styled-components"

const Stats = () => {
  const {showMovieStats, isLoading, showShowStats, monthlyMovies} =
    useAppContext()
  useEffect(() => {
    showMovieStats()
    showShowStats()
  }, [])
  // if (isLoading) {
  //   return <Loading center />
  // }
  return (
    <Wrapper>
      <StatsContainer />
      <ChartsContainer />
    </Wrapper>
  )
}
export default Stats

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
