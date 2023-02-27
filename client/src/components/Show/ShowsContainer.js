import {useEffect} from "react"
import {useAppContext} from "../../context/appContext"
import styled from "styled-components"
import Alert from "../Alert"
import Show from "./Show"

const ShowsContainer = () => {
  const {
    getAllShows,
    getOwnShows,
    shows,
    isLoading,
    page,
    totalShows,
    showAlert,
    showSearch,
    showRatingType,
    showSort,
  } = useAppContext()
  useEffect(() => {
    getAllShows()
    getOwnShows()
  }, [showSearch, showRatingType, showSort])
  if (isLoading) {
    // return <Loading />
  }
  if (shows.length === 0) {
    return (
      <Wrapper>
        <h2> No shows to show...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalShows} show{shows.length > 1 && "s"} found
      </h5>
      <div className="shows">
        {shows.map((show) => {
          return <Show key={show._id} {...show} />
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
  .shows {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 900px) {
    .shows {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 1330px) {
    .shows {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    @media (min-width: 1700px) {
      .shows {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 0.5rem;
      }
    }
  }
`

export default ShowsContainer
