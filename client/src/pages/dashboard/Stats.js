import {useEffect} from "react"
import {useAppContext} from "../../context/appContext"
import {StatsContainer, Loading, ChartsContainer} from "../../components"

const Stats = () => {
  const {showMovieStats, isLoading, showShowStats, monthlyReviews} =
    useAppContext()
  useEffect(() => {
    showMovieStats()
    showShowStats()
  }, [])
  // if (isLoading) {
  //   return <Loading center />
  // }
  return (
    <>
      <StatsContainer />
      {monthlyReviews > 0 && <ChartsContainer />}
    </>
  )
}
export default Stats
